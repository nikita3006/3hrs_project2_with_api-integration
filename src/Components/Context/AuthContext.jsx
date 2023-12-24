import React, { useState } from 'react'
import {useHistory} from 'react-router-dom';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn : false,
    login : (token,email)=>{},
    logout : ()=>{},
    userEmail : ""
})

export const AuthContextProvider = (props)=>{
    const history = useHistory()
    const initalToken = localStorage.getItem('token')
    const [token,setToken]=useState(initalToken);
    const [userEmail,setUserEmail] = useState(localStorage.getItem('email'))
    const userIsLoggedIn = token ? true : false;
    console.log(userIsLoggedIn,'in authctx check');

    const loginHandler =(token,email)=>{
        localStorage.setItem('token',token)
        localStorage.setItem('email',email);
        setUserEmail(email)
        setToken(token);
    }
    const logoutHandler = ()=>{
        localStorage.clear();
        history.replace('/auth');
        setToken(null);
        setTimeout(()=>{
            localStorage.clear();
            setToken(null);
        },5*60*1000);
    }

    const contextValue ={
        token : token,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler,
        userEmail : userEmail
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext