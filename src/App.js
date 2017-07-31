import React, { Component } from 'react';
import './App.css';

import ItemHolder from './Components/ItemHolder/ItemHolder'
import CartItemHolder from './Components/CartItemHolder/CartItemHolder'
import RecentOrderHolder from './Components/RecentOrderHolder/RecentOrderHolder'


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
    let cart = JSON.parse(localStorage.getItem('cart')) || []

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
    this.setState({
      cart: cart,
    })
  }

  updateOrders(orders){
    this.setState({
      cart: [],
      orders: orders
    })
  }

  addToCart(item){
    this.state.cart.push(item)
    this.setState({
      cart: this.state.cart
    })
    this.storeLocal(this.state.cart)
  }

  storeLocal(cart){
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  render() {
    return (
      <div className="App">
        <h1>AmazonBay</h1>
        <main>
          <RecentOrderHolder orders = {this.state.orders}/>
          <ItemHolder items = {this.state.items} addToCart = {this.addToCart.bind(this)}/>
          <CartItemHolder cartItems = {this.state.cart} updateOrders = {this.updateOrders.bind(this)}/>
        </main>
      </div>
    );
  }
}

export default App;
