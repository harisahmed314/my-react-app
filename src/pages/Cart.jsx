import React, { useContext, useEffect } from 'react';
import { CartContext } from '../Global/CartContext';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/config';

export const Cart = ({ user }) => {
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                navigate('/login');
            }
        })
    }, []);



    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {shoppingCart.length !== 0 && <h1 className="text-2xl font-bold mb-4">Cart</h1>}
            <div className='cart-container space-y-6'>
                {
                    shoppingCart.length === 0 &&
                    <div className="bg-red-100 p-6 rounded shadow-md">
                        <div className="text-red-700">No items in your cart, slow internet might be causing trouble, or you are not logged in.</div>
                        <div className="mt-2"><Link to="/" className="text-blue-600 hover:underline">Return to Home page</Link></div>
                    </div>
                }
                {shoppingCart.map(cart => (
                    <div className='cart-card bg-white p-4 rounded shadow-md grid grid-cols-1 md:grid-cols-5 gap-4' key={cart.ProductID}>
                        <div className='cart-img'>
                            <img className="rounded max-h-32 object-cover mx-auto" src={cart.ProductImg} alt="Product" />
                        </div>
                        <div className='cart-name col-span-2 md:col-span-1'>
                            <span className="text-xl">{cart.ProductName}</span>
                        </div>
                        <div className='cart-price-orignal col-span-2 md:col-span-1'>
                            Rs {cart.ProductPrice}.00
                        </div>
                        <div className='flex items-center col-span-2 md:col-span-1'>
                            <button className='bg-blue-500 p-2 rounded text-white mr-2' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}><Icon icon={ic_add} size={24} /></button>
                            <span className='text-xl'>{cart.qty}</span>
                            <button className='bg-red-500 p-2 rounded text-white ml-2' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}><Icon icon={ic_remove} size={24} /></button>
                        </div>
                        <div className='cart-price col-span-2 md:col-span-1'>
                            Rs {cart.TotalProductPrice}.00
                        </div>
                        <button className='delete-btn bg-red-500 p-2 rounded text-white' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                            <Icon icon={iosTrashOutline} size={24} />
                        </button>
                    </div>
                ))}
            </div>
            {shoppingCart.length > 0 &&
                <div className='cart-summary mt-8 p-6 bg-white rounded shadow-md'>
                    <h2 className='text-xl font-bold mb-4'>Cart-Summary</h2>
                    <div className='cart-summary-price flex justify-between mb-2'>
                        <span>Total Price</span>
                        <span>{totalPrice}</span>
                    </div>
                    <div className='cart-summary-price flex justify-between mb-4'>
                        <span>Total Qty</span>
                        <span>{totalQty}</span>
                    </div>
                    <Link to='cashout' className='cashout-link'>
                        <button className='btn btn-success w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded'>
                            Cash on delivery
                        </button>
                    </Link>
                </div>
            }
        </div>
    )
}