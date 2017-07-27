import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ItemHolder from './Components/ItemHolder/ItemHolder'
import CartItemHolder from './Components/CartItemHolder/CartItemHolder'
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
    let cart = JSON.parse(localStorage.getItem('cart')) || ''
    console.log(cart)

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

  storeLocal(cart){
    localStorage.setItem('cart', cart)
  }

  addToCart(item){
    this.state.cart.push(item)
    this.setState({
      cart: this.state.cart
    })
    console.log(this.state.cart)
    this.storeLocal(this.state.cart)
  }

  render() {
    return (
      <div className="App">
        <h1>AmazonBay</h1>
        <main>
          <ItemHolder items = {this.state.items} addToCart = {this.addToCart.bind(this)}/>
          <CartItemHolder cartItems = {this.state.cart}/>
        </main>
      </div>
    );
  }
}

export default App;
