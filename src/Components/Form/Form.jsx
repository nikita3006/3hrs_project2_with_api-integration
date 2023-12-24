import React, { useContext, useRef } from 'react'
import Input from '../UI/Input'
import classes from './Form.module.css';
import CartContext from '../Context/CartContext';
import FormItem from './FormItem';

function Form(props) {
    const medName = useRef()
    const medDesc = useRef()
    const medPrice = useRef()
    const medQty = useRef()

    const menuCtx =useContext(CartContext)

    const totalQuantity = menuCtx.cart.reduce((sum,element)=>{
        return sum + element.quantity
    },0)
   

    const submitHandler=(event)=>{
        event.preventDefault()
        const enteredName = medName.current.value;
        const enteredDesc = medDesc.current.value;
        const enteredPrice = medPrice.current.value;
        const enteredQty = medQty.current.value;
        const obj = {
            ItemName : enteredName,
            description : enteredDesc,
            price : enteredPrice,
            avaliableQuantity : enteredQty
        }
        menuCtx.addToMenu(obj)
        medName.current.value = ""
        medDesc.current.value = ""
        medPrice.current.value = ""
        medQty.current.value = ""
    }
  return (
    <div>
        <form onSubmit={submitHandler} className={classes.container}>
            <Input 
                ref={medName}
                label= 'Name'
                input = {{
                    type: 'text',
                    id: 'name',
                    placeholder: 'Enter the name'
                }}
            />
            <Input 
                ref={medDesc}
                label= 'Description'
                input = {{
                    type: 'text',
                    id: 'description',
                    placeholder: 'Enter the description'
                }}
            />
            <Input 
                ref={medPrice}
                label= 'Price'
                input = {{
                    type: 'number',
                    id: 'price',
                    placeholder: 'Enter the price',
                    min: '10',
                    
                }}
            />
            <Input 
                ref={medQty}
                label= 'Quantity'
                input = {{
                    type: 'number',
                    id: 'quantity',
                    placeholder: 'Enter the quantity',
                    min : '1',
                    max : '100',
                    step: '1',
                    
                }}
            />
            <button className={classes.btn}>Add product</button>
            <button type='button' className={classes.btn} onClick={props.onShow}>Cart {totalQuantity}</button>
        </form>
        <FormItem />
    </div>
  )
}

export default Form