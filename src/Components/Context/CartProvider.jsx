import React, { useContext, useEffect, useState } from 'react'
import CartContext from './CartContext'
import AuthContext from './AuthContext';

function CartProvider(props) {
    const [cart, setCart] = useState([])
   const [menuItems, setMenuItems]=useState([])
   const authCtx = useContext(AuthContext);
   const userEmail = authCtx.userEmail;
   let userName = userEmail && userEmail.split("@")[0];

    useEffect(()=>{
      const fetchData = async ()=>{
        try {
          const response = await fetch(`https://react-htttps-copy-default-rtdb.firebaseio.com/medicalshop/menu/${userName}.json`)
          const data = await response.json()
          console.log(data ,'in useEffect')
          const loadedData =[];
          for (let key in data){
            loadedData.push({...data[key],id: key})
          }
          setMenuItems(loadedData)

        } catch (error) {
          console.log(error,'in fetch data');
        }
      }
      fetchData();  
    }
    ,[])


    useEffect(()=>{
      const fetchData = async ()=>{
        try {
          const response = await fetch(`https://react-htttps-copy-default-rtdb.firebaseio.com/medicalshop/cart/${userName}.json`)
          const data = await response.json()
          console.log(data ,'in useEffect')
          const loadedData =[];
          for (let key in data){
            loadedData.push({...data[key],id: key})
          }
          setCart(loadedData)

        } catch (error) {
          console.log(error,'in fetch data');
        }
      }
      fetchData();  
    }
    ,[])


   const addItem = async (newItem)=>{
    try {
      const menuItemIndex = menuItems.findIndex(
        (item) => item.ItemName === newItem.ItemName)
      
      const menuItem = menuItems[menuItemIndex];
      if(menuItem.avaliableQuantity === 0 ){
        alert("Out of stock");
        return ;
      }else{
        const updatedMenu = {
          ...menuItem , 
          avaliableQuantity : menuItem.avaliableQuantity - 1
        }
        const updatedMenuItems =[...menuItems];
        updatedMenuItems[menuItemIndex] = updatedMenu;
        setMenuItems(updatedMenuItems)
        const response = await fetch(`https://react-htttps-copy-default-rtdb.firebaseio.com/medicalshop/menu/${userName}/${menuItem.id}.json`,{
          method : "PUT",
          body : JSON.stringify(updatedMenu),
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        if(!response.ok){
          throw new Error('Something Went wrong');
        }
      } 
      const existingItemIndex = cart.findIndex(
        (item) => item.ItemName === newItem.ItemName
      )
      const existingItem = cart[existingItemIndex];
      if(existingItem){
        const updatedItem ={
          ...existingItem,
          quantity : existingItem.quantity + 1
        }
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = updatedItem;
        const response = await fetch(`https://react-htttps-copy-default-rtdb.firebaseio.com/medicalshop/cart/${userName}/${updatedItem.id}.json`,{
          method :'PUT',
          body : JSON.stringify(updatedItem),
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        if(!response.ok){
          throw new Error("something went wrong")
        }
        setCart(updatedCart)
      }else{
        const updatedItem ={
          ...newItem,
          quantity : 1
        };
        const response = await fetch(`https://react-htttps-copy-default-rtdb.firebaseio.com/medicalshop/cart/${userName}.json`,{
          method: "POST",
          body : JSON.stringify(updatedItem),
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        if(!response.ok){
          throw new Error
        }
        const data = await response.json();
        const newCartItem = {...updatedItem,id: data.name}
        setCart([...cart,newCartItem])
      }
    } catch (error) {
      console.log(error,'in additem')
    }
    } 
  
   const removeItem = async (deletingItem)=>{
    try {
      const menuItemIndex = menuItems.findIndex(
        (item) => item.ItemName === deletingItem.ItemName
      )
      const menuItem = menuItems[menuItemIndex];
      const updatedMenu = {
        ...menuItem,
        avaliableQuantity : menuItem.avaliableQuantity + 1
      }
      const updatedMenuItems = [...menuItems];
      updatedMenuItems[menuItemIndex] = updatedMenu;
      const response = await fetch(`https://react-htttps-copy-default-rtdb.firebaseio.com/medicalshop/menu/${userName}/${updatedMenu.id}.json`,{
        method: "PUT",
        body : JSON.stringify(updatedMenu),
        headers : {
          'Content-Type' : 'application/json'
        }
      })
      const data = await response.json();
      setMenuItems(updatedMenuItems);

      
      const deletingItemIndex  = cart.findIndex(
        (item) => item.ItemName === deletingItem.ItemName
      );
      if (deletingItem.quantity === 1){
        const updatedItem = cart.filter(
          (item) => item.ItemName !== deletingItem.ItemName
        );
        const response = await fetch(`https://react-htttps-copy-default-rtdb.firebaseio.com/medicalshop/cart/${userName}/${deletingItem.id}.json`,{
          method: "DELETE",
          body : JSON.stringify(deletingItem),
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        const data = await response.json();
        if(!response.ok){
          throw new Error("something went wrong");
        }
        setCart(updatedItem)
      }else{
        const updatedItem = {
          ...deletingItem,
          quantity : deletingItem.quantity-1,
        }
        const updatedCart = [...cart];
        updatedCart[deletingItemIndex] = updatedItem;
        const response = await fetch(`https://react-htttps-copy-default-rtdb.firebaseio.com/medicalshop/cart/${userName}/${updatedItem.id}.json`,{
          method: "PUT",
          body : JSON.stringify(updatedItem),
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        const data = response.json();
        if(!response.ok){
          throw new Error("something went wrong");
        }
        setCart(updatedCart);
      }

    } catch (error) {
      console.log(error);
    }
    }
   
   const addToMenu = async (newItem) => {
    try {
      
      const response = await fetch(`https://react-htttps-copy-default-rtdb.firebaseio.com/medicalshop/menu/${userName}.json`,{
        method: "POST",
        body : JSON.stringify(newItem),
        headers : {
          'Content-Type' : 'application/json'
        }
      })
      const data = await response.json();
      const updatedNewItem = {...newItem,id:data.name}
      setMenuItems([...menuItems, updatedNewItem]);
    } catch (error) {
      console.log(error,'in addtomenu')
    }
   
  };

   const obj = {
    addItem,removeItem,addToMenu,menuItems,cart
   }
  return (
    <CartContext.Provider value={obj}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider