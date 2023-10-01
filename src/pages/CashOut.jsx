import React, { useState, useEffect, useContext } from 'react';
import { collection, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { CartContext } from '../Global/CartContext';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/config';

export const Cashout =()=> {
    const navigate = useNavigate();
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                setEmail(authUser.email);
                setUser(authUser);
            } else {
                navigate('/login');
            }
        });

        // Cleanup the onAuthStateChanged listener on component unmount
        return () => unsubscribe();
    }, [navigate]);

    

    const cashoutSubmit = async (e) => {
        e.preventDefault();

       

        try {
            const date = new Date();
            const time = date.getTime();
            const buyerDocRef = doc(db, `Buyer-info-${user.uid}`, `_${time}`);

            await setDoc(buyerDocRef, {
                BuyerName: name,
                BuyerEmail: email,
                BuyerCell: cell,
                BuyerAddress: address,
                BuyerPayment: totalPrice,
                BuyerQuantity: totalQty
            });

            setCell('');
            setAddress('');
            dispatch({ type: 'EMPTY' });

            setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected to the home page after 5 seconds');

            setTimeout(() => {
                navigate('/');
            }, 5000);
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <>
            <div className='container'>
                <br />
                <h2>Cashout Details</h2>
                <br />
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setName(e.target.value)} value={name} />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        value={email} disabled />
                    <br />
                    <label htmlFor="Cell No">Cell No</label>
                    <input type="number" className='form-control' required
                        onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' />
                    <br />
                    <label htmlFor="Delivery Address">Delivery Address</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br />
                    <label htmlFor="Price To Pay">Price To Pay</label>
                    <input type="number" className='form-control' required
                        value={totalPrice} disabled />
                    <br />
                    <label htmlFor="Total No of Products">Total No of Products</label>
                    <input type="number" className='form-control' required
                        value={totalQty} disabled />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    )
}