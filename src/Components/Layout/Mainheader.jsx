import React from 'react';
import classes from './Mainheader.module.css';
import {useHistory} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

function Mainheader() {
  const {logout,isLoggedIn}=useContext(AuthContext)
  return (
    <>
    <header className={classes.header}>
        <div className={classes.logo}><a href='#'>REACT HEADER</a></div>
        <nav>
            <ul>
                <li>
                  {!isLoggedIn && <a href="#">Login</a>}
                </li>
                <li> 
                   {isLoggedIn && <a href='#'>Profile</a>}
                </li>
                <li>
                   {isLoggedIn && <button onClick={logout}>Logout</button>}
                </li>
            </ul>
        </nav>
    </header>

    </>
  )
}

export default Mainheader