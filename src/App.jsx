import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import { AddProducts } from './pages/AddProduct';
import { auth, db } from './config/config';
import { BrowserRouter } from 'react-router-dom';
import { ProductsContextProvider } from './Global/productcontext.jsx';
import Home from './pages/Home';
import React, { Component } from 'react';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export class App extends Component {
  state = {
    user: null,
    error: null,
  };

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Just set the user's display name (or email if display name doesn't exist)
        this.setState({
          user: user.displayName || user.email
        });
      } else {
        this.setState({
          user: null
        });
      }
    });

    console.log(this.state.user)
  }


  render() {


    return (
      

        <ProductsContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout user={this.state.user} />}>
                <Route path='/' element={<Home user={this.state.user} />} />
                <Route path="/signup" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/addproducts" element={<AddProducts />} />
                {/* You can add the rest of your routes here */}
              </Route>
            </Routes>
          </BrowserRouter>
        </ProductsContextProvider>

      
    );
  }
}

export default App;
