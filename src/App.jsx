import React, { useState } from "react"
import { Switch,Route, Redirect } from "react-router-dom";
import Form from "./Components/Form/Form"
import Cart from "./Components/Cart/Cart";
import Layout from "./Components/Layout/Layout";
import AuthForm from "./Components/Auth/AuthForm";
import { useContext } from "react";
import AuthContext from "./Components/Context/AuthContext";

function App() {
  const [isValid , setIsValid]=useState(false);

  const {isLoggedIn} = useContext(AuthContext);

  const showCartHanlder = ()=>{
    setIsValid(true)
  }
  const hideCartHandler = ()=>{
    setIsValid(false)
  }
  console.log(isValid,'isvalid in app.js')

  return (
    <Layout>
        <Switch>
          <Route path='/' exact>
            {isLoggedIn && <Redirect to='/afterlogin' />}
            {!isLoggedIn && <Redirect to='/auth' />}
          </Route>
          <Route path="/auth" exact>
            <AuthForm />
          </Route>

          <Route path='/afterlogin' exact>
            {isLoggedIn && <Form onShow={showCartHanlder} />}
            {isValid && <Cart onClose = {hideCartHandler}/>}
            {!isLoggedIn && <Redirect to='/auth' />}
          </Route>
          <Route path="*">
            <Redirect to='/afterlogin'/>
          </Route>
        </Switch>
    </Layout>
  )
}

export default App
