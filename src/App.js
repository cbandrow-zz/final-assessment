import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ItemHolder from './Components/ItemHolder/ItemHolder'
// import CartItemHolder from './Components/CartItemHolder'
// import RecentOrderHolder from './Components/RecentOrderHolder'


class App extends Component {
  constructor(){
    super()
    this.state = {
      items: [],
      orders: [],
      cart: []
    }
  }
  componentDidMount(){
    fetch('/api/v1/items')
      .then(data => data.json())
      .then((items) => {
        this.setState({
          items: items
        })
      })

    fetch('/api/v1/orders')
      .then(data => data.json())
      .then((orders) => {
        this.setState({
          orders: orders
        })
      })
  }

  addToCart(item){
    this.state.cart.push(item)
    this.setState({
      cart: this.state.cart
    })
    console.log(this.state.cart)
  }

  removeFromCart(item){
    
  }

  render() {
    return (
      <div className="App">
        <h1>Amazonbayetsy</h1>
        <ItemHolder items = {this.state.items} addToCart = {this.addToCart.bind(this)}/>
      </div>
    );
  }
}

export default App;
