import React, {Component} from 'react';
import CartItem from '../CartItem/CartItem'

export default class CartItemHolder extends Component{
  constructor(){
    super()
    this.state = {
      button: false,
      display: 'cart-contents-off'
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
  }

  handleCheckout(total){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    fetch('/api/v1/orders',{
      method: "POST",
      header:{"Content-Type":"application/json"},
      body: JSON.stringify({
        "price": `${total}`,
        "date": `${date}`
      })
    }).catch(err => console.log(err))
    localStorage.clear()
  }

  render(){
    let {cartItems, clearCart} = this.props;

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
        <button className = "purchase" onClick = {() => this.handleCheckout(total)}>Submit and Purchase</button>
      </div>
    </section>
    )
  }
}
