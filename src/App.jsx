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
import { onAuthStateChanged } from 'firebase/auth';
import { CartContextProvider } from './Global/CartContext';
import { Cart } from './pages/Cart';
import ProductsPage from './pages/ProductPage';
import { AddSaleProducts } from './pages/AddSaleProducts';
import { SaleProductsContext } from './Global/saleproductcontext';

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
        <SaleProductsContext>
          <CartContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Layout user={this.state.user} />}>
                  <Route path='/' element={<Home user={this.state.user} />} />
                  <Route path="/signup" element={<RegistrationPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/addproducts" element={<AddProducts />} />
                  <Route path="/cartproducts" element={<Cart user={this.state.user} />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/addsaleproducts" element={<AddSaleProducts />} />

                </Route>
              </Routes>
            </BrowserRouter>
          </CartContextProvider>
        </SaleProductsContext>
      </ProductsContextProvider>


    );
  }
}

export default App;
