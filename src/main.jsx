import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthUserProvider } from './firebase/auth.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(



  <AuthUserProvider>


  <React.StrictMode>
    <BrowserRouter>
      <App />

    </BrowserRouter>
  </React.StrictMode>

  </AuthUserProvider>

)
