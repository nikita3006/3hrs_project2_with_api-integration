import React, { useContext } from 'react'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../Context/CartContext'

function Cart(props) {
    const menuCtx = useContext(CartContext)
    const totalPrice = menuCtx.cart.reduce((sum,element)=>
      sum + element.price *element.quantity
  ,0)
    

  return (
    <Modal onClose = {props.onClose}>
        <h1>cart</h1>
        <ul className={classes.menuItems}>
            {menuCtx.cart.map((item,index)=> 
                <div key={index} className={classes.item}>
                    <h2>{item.ItemName}</h2>
                    <h2>{item.description}</h2>
                    <h2>{item.price}</h2>
                    <h2>{item.quantity}</h2>
                    <button className={classes.btn} onClick={menuCtx.addItem.bind(null,item)}>Add</button>
                    <button className={classes.btn} onClick={menuCtx.removeItem.bind(null,item)}>Remove</button>
                </div>
             )}
        </ul>
        <div className={classes.total}>
            <span>Total amount</span>
            <span>{totalPrice}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes.btn} onClick={props.onClose}>Close</button>
            <button className={classes.btn} >Proceed</button>
        </div>
    </Modal>
  )
}

export default Cart