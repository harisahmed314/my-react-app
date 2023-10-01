import React, { useState, useEffect, useContext } from 'react';
import { collection, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { CartContext } from '../Global/CartContext';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/config';

export const Cashout = () => {
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
            <div className="container mx-auto px-6 py-8">
                <h2 className="text-2xl font-semibold text-center mb-6">Cashout Details</h2>

                {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{successMsg}</div>}

                <form onSubmit={cashoutSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" className="mt-1 p-2 w-full border rounded-md" required onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" className="mt-1 p-2 w-full border rounded-md bg-gray-100 cursor-not-allowed" required value={email} disabled />
                    </div>
                    <div>
                        <label htmlFor="Cell No" className="block text-sm font-medium text-gray-700">Cell No</label>
                        <input type="number" className="mt-1 p-2 w-full border rounded-md" required onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' />
                    </div>
                    <div>
                        <label htmlFor="Delivery Address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
                        <input type="text" className="mt-1 p-2 w-full border rounded-md" required onChange={(e) => setAddress(e.target.value)} value={address} />
                    </div>
                    <div>
                        <label htmlFor="Price To Pay" className="block text-sm font-medium text-gray-700">Price To Pay</label>
                        <input type="number" className="mt-1 p-2 w-full border rounded-md bg-gray-100 cursor-not-allowed" required value={totalPrice} disabled />
                    </div>
                    <div>
                        <label htmlFor="Total No of Products" className="block text-sm font-medium text-gray-700">Total No of Products</label>
                        <input type="number" className="mt-1 p-2 w-full border rounded-md bg-gray-100 cursor-not-allowed" required value={totalQty} disabled />
                    </div>
                    <div>
                        <button type="submit" className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">SUBMIT</button>
                    </div>
                </form>

                {error && <span className="block mt-4 text-red-500">{error}</span>}
            </div>

        </>
    )
}