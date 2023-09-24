
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import { AddProducts } from './pages/AddProduct'
import { auth, db } from './config/config'
import { BrowserRouter } from 'react-router-dom'
import { ProductsContextProvider } from './Global/productcontext.jsx'
import Home from './pages/Home'
import React, { Component } from 'react';
import { doc, getDoc } from 'firebase/firestore';






export class App extends Component {

  state = {
    user: null,
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.getUserInfo(user.uid);
      } else {
        this.setState({
          user: null
        })
      }
    });
  }
  async getUserInfo(uid) {
    console.log("Getting user info for UID:", uid);
    try {
      const userRef = doc(db, 'SignedUpUsersData', uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        this.setState({
          user: userSnapshot.data().Name
        });
        console.log("User info fetched:", userSnapshot.data());
      } else {
        console.log("No user data found for UID:", uid);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  }
  








  render() {
    return (
      <ProductsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout user={this.state.user} />}>
              {/* home */}
              <Route path='/' element={<Home user={this.state.user} />} />
              {/* signup */}
              <Route path="/signup" element={<RegistrationPage />} />
              {/* login */}
              <Route path="/login" element={<LoginPage />} />
              {/* cart products */}
              {/* <Route path="/cartproducts" element={<Cart user={this.state.user} />} /> */}
              {/* add products */}
              <Route path="/addproducts" element={<AddProducts />} />
              {/* cashout */}
              {/* <Route path='/cashout' element={<Cashout user={this.state.user} />} />
             <Route element={NotFound} /> */}
            </Route>
          </Routes>

        </BrowserRouter>
      </ProductsContextProvider>
    )
  }
}

export default App