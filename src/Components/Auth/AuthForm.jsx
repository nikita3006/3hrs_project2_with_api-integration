import React, { useRef, useState } from 'react';
import classes from './AuthForm.module.css';
import {useHistory} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

function AuthForm() {
    const inputMailRef = useRef()
    const inputPassRef = useRef()
    const history = useHistory();
    const [isLoading, setIsLoading]=useState(false)
    const [isLogin, setIsLogin]= useState(false)
    const authCtx = useContext(AuthContext)

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

const submitHandler = async (event)=>{
    // in try block if it encounters any error , it will automatically stop the execution of the program it will throw catch block error
    try {
        event.preventDefault();
        const enteredMail = inputMailRef.current.value;
        const enteredPass = inputPassRef.current.value;
        setIsLoading(true);
        let url;
        if(isLogin){
          url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBNqXOohJ5C1pTxxgYtTbpbxZc1ncW9fc';
        }else{
          url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBNqXOohJ5C1pTxxgYtTbpbxZc1ncW9fc';
        }
        const response = await fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email : enteredMail,
                    password : enteredPass,
                    returnSecureToken : true
                }),
                headers : {
                    'Content-Type': 'application/json' 
                }
            }
        )
        setIsLoading(false)
        console.log(response ,'in submitHandler')
        //failure condition
        if (!response.ok){
            const errorData = await response.json()
            console.log(errorData, 'in if loop')
            throw new Error(errorData.error.message);
        }
        //success condition 
        const data = await response.json()
        console.log(data,'sucess')
        isLogin && authCtx.login(data.idToken,data.email);
        alert(`${isLogin ? "Login Successfull" : "Account Created"}`)
        isLogin && history.replace('/afterlogin')
       
        

                    
    }catch (error) {
            // console.log(error);
            alert(error)
     }
    }
    
  return (
    <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
        <div className={classes.control}> 
            <label htmlFor="">Your Email</label>
            <input type="mail" ref={inputMailRef} required />
        </div>
        <div className={classes.control}> 
            <label htmlFor="">Your Password</label>
            <input type="password"ref={inputPassRef} minLength='7' required />
        </div>
        <div className={classes.actions}> 
            {!isLoading && <button>{isLogin ? "Login": "Create Account"}</button>}
            {isLoading && <p>Sending Request</p>}
            <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>{isLogin ? "Create new account" : "Log in with existing account"}</button>
        </div>
        </form>
    </section>
  )
}

export default AuthForm;



// .then((res)=>{
//     setIsLoading(false);
//     if(res.ok){
//         return res.json();
//     }else{
//         return res.json().then((data)=>{
//             let errorMessage = "authentication failed";
//             if(data && data.error && data.error.message){
//                 errorMessage = data.error.message;
//             }

//             throw new Error(errorMessage);
//         })
//     }
// }).then(data =>{
//     authCtx.login(data.idToken);
    
// }).catch(err =>{
//     alert(err.message);
// })

// } 