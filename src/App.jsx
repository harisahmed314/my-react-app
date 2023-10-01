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
import { SaleProductsContext, SaleProductsContextProvider } from './Global/saleproductcontext';
import { SaleProducts } from './pages/SaleProducts';
import ProductView from './pages/ProductView';
import SaleProductView from './pages/SaleProductView';
import { Cashout } from './pages/CashOut';

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
        <CartContextProvider>
          <SaleProductsContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Layout user={this.state.user} />}>
                  <Route path='/' element={<Home user={this.state.user} />} />
                  <Route path="/signup" element={<RegistrationPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/addproducts" element={<AddProducts />} />
                  <Route path="/cartproducts" element={<Cart user={this.state.user} />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductView />} />
                  <Route path="/addsaleproducts" element={<AddSaleProducts />} />
                  <Route path="/saleproducts" element={<SaleProducts />} />
                  <Route path="/saleproduct/:id" element={<SaleProductView />} />
                  <Route path="/cartproducts/cashout" element={<Cashout user={this.state.user} />} />

                </Route>
              </Routes>
            </BrowserRouter>
          </SaleProductsContextProvider>
        </CartContextProvider>
      </ProductsContextProvider>


    );
  }
}

export default App;
