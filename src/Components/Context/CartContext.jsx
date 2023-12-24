import React from 'react'

const CartContext =React.createContext({
  cart : [],
  addItem : (item)=>{},
  removeItem : (item) =>{},
  addToMenu : (item)=>{},
  menuItems :[]
})

export default CartContext