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
        onAuthStateChanged(auth, user => {
            if (user) {
                const userRef = doc(db, 'SignedUpUsersData', user.uid);
                getDoc(userRef)
                    .then(snapshot => {
                        if (snapshot.exists()) {
                            this.setState({
                                user: snapshot.data().Name,
                            });
                        } else {
                            this.setState({
                                error: `No user data found for UID: ${user.uid}`,
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching user data:", error);
                        this.setState({ error: "Error fetching user data." });
                    });
            } else {
                this.setState({
                    user: null,
                });
            }
        });
    }

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error}</div>;
        }

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
