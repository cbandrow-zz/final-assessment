import React, {Component} from 'react';

export default class  RecentOrderHolder extends Component{
  constructor(){
    super()
    this.state = {
      button: false,
      display: 'order-contents-off'
    }
  }

  checkButtonState(){
    if (this.state.button === false){
      this.setState({
        display: 'order-contents-on',
        button: true
      })
    } else {
      this.setState({
        display: 'order-contents-off',
        button: false
      })
    }
  }

  render(){
    let btnImg = "";
    let {orders} = this.props || []
    if (this.state.button === false){
      btnImg = "https://maxcdn.icons8.com/Android_L/PNG/512/Science/plus_math-512.png";
    } else {
      btnImg = "https://maxcdn.icons8.com/Android_L/PNG/512/Science/minus_math-512.png";
    }
    return(
      <section className = "RecentOrderHolder">
        {orders.length === [] ? (
          <div className = {`${this.state.display}`}>
            <h2>Your Orders Will Go Here</h2>
          </div>
        ) : (
          <div className = {`${this.state.display}`}>
          <h2>Recent Orders</h2>
            {orders.map((order) =>{
              return(
                <div>
                  <h3>Date: {order.date}</h3>
                  <p>Total: ${order.total_price}</p>
                </div>
              )
            }
          )}
        </div>

        )}
      <div className = "order-side">
        <button onClick = {() => this.checkButtonState()} className = "display-orders"><img src={btnImg}/></button>
      </div>
    </section>
    )
  }
}
