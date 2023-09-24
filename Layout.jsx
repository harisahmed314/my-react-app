import { Outlet } from "react-router-dom";
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth } from './src/config/config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useNavigate } from 'react-router-dom';
import logo from './src/Images/logo.png'


export default function Layout({ user }){

    const navigate = useNavigate();

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');
        })
    }

    return (
        <>
            <div className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
                <div>
                    <img src={logo} alt="Logo" className="h-10 w-auto" />
                </div>

                {!user ? (
                    <div className="space-x-4">
                        <Link to="signup" className="text-blue-500 hover:text-blue-700">SIGN UP</Link>
                        <Link to="login" className="text-blue-500 hover:text-blue-700">LOGIN</Link>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-gray-900">{user}</Link>
                        <Link to="cartproducts" className="relative">
                            <Icon icon={cart} className="text-gray-700" />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{totalQty}</span>
                        </Link>
                        <button className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
            <Outlet />
        </>
    )
}   