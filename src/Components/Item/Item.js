import React from 'react';

const Item = ({item, addToCart}) =>{
  return(
    <section className = "Item">
      <header>
        <h2>{item.title}:</h2>
      </header>
      <div>
        <img src = {item.picture_url}/>
      </div>
      <h3><em>{item.price}</em></h3>
      <p>{item.item_description}</p>
      <button onClick={() =>{addToCart(item)}} 
              className = "cart-btn">Add To Cart</button>
    </section>
  )
}


export default Item
