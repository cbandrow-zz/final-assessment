import React from 'react'

const CartItem = ({cartItem}) =>{
  return(
    <section className = "CartItem">
      <h2>{cartItem.title}:</h2>
      <h3><em>${cartItem.price}</em></h3>
      <button className = "cart-rmv"></button>
    </section>
  )
}


export default CartItem
