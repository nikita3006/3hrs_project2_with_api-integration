import React, { useContext } from 'react'
import CartContext from '../Context/CartContext'
import classes from './FormItem.module.css';


function FormItem() {
   const menuCtx = useContext(CartContext)
   

  return (
    <div className={classes.container}>
        <ul className={classes.menuItem}>
            {menuCtx.menuItems.map((item, index)=>(
                <div key={index} className={classes.item}>
                    <h2>{item.ItemName}</h2>
                    <h2>{item.description}</h2>
                    <h2>{item.price}</h2>
                    <h2>{item.avaliableQuantity}</h2>
                    <button className={classes.btn} onClick={menuCtx.addItem.bind(null,item)}>Add to Cart</button>
                </div>
            ))}
        </ul>
    </div>
  )
}

export default FormItem