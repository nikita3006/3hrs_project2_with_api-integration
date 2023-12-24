import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CartProvider from './Components/Context/CartProvider.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Components/Context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <CartProvider>
        <AuthContextProvider> 
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        </AuthContextProvider>
      </CartProvider>
    </BrowserRouter>
  
)
