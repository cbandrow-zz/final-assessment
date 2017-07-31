import React, {Component} from 'react';
import CartItem from '../CartItem/CartItem'

export default class CartItemHolder extends Component{
  constructor(){
    super()
    this.state = {
      button: false,
      display: 'cart-contents-off',
      cartItems: [],
    }
  }

  componentDidMount(){
    this.setState({
      cartItems: this.props.cartItems
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cartItems !== this.props.cartItems){
      this.setState({
        cartItems: nextProps.cartItems,
      })
    }
  }

  checkButtonState(){
    if (this.state.button === false){
      this.setState({
        display: 'cart-contents-on',
        button: true
      })
    } else {
      this.setState({
        display: 'cart-contents-off',
        button: false
      })
    }
    this.setState({
      cartItems: this.props.cartItems
    })
  }

  handleCheckout(total){
    let { updateOrders } = this.props
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let time = `${month}-${day}-${year}`

    fetch('/api/v1/orders',{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        price: total,
        date: time
      })
    }).then((response) => {
      fetch('/api/v1/orders')
        .then(data => data.json())
        .then((orders) => {
        this.props.updateOrders(orders)
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

    localStorage.clear()
    this.setState({
      cartItems: []
    })
  }
  disableSubmit(){
    if(this.state.cartItems.length > 0){
      return false
    } else {
      return true
    }
  }

  render(){
    let {updateOrders} = this.props;
    let cartItems = this.state.cartItems;

    let total = cartItems.reduce((acc, cartItem) =>{
      return acc + parseFloat(cartItem.price)
    }, 0)
    let btnImg = '';

    if (this.state.button === false){
      btnImg = "https://maxcdn.icons8.com/Android_L/PNG/512/Science/plus_math-512.png";
    } else {
      btnImg = "https://maxcdn.icons8.com/Android_L/PNG/512/Science/minus_math-512.png";
    }

    return(
      <section className = "CartItemHolder">
        <div className = "cart-side">
          <button onClick = {() => this.checkButtonState()} className = "display-cart"><img src={btnImg}/></button>
        </div>
        <div className = {`${this.state.display}`}>
          {cartItems.map((cartItem) =>{
            return(
              <CartItem cartItem = {cartItem}/>
            )
          }
        )}
        {cartItems.length > 0 ? (
          <h2>Total Price: ${total}</h2>
        ) : (
          <h2>Add Something to your Cart</h2>
        )}
        <button disabled={this.disableSubmit()} className = "purchase" onClick = {() => this.handleCheckout(total)}>Submit and Purchase</button>
      </div>
    </section>
    )
  }
}
