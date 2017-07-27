import React from 'react';
import Item from '../Item/Item'

const ItemHolder = ({items, addToCart}) =>{

  return(
    <section className = "ItemHolder">
      {items.map((item) =>{
        return(
          <Item item = {item} addToCart = {addToCart}/>
        )
      }
    )}
    </section>
  )
}

export default ItemHolder
