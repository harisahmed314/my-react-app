import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../firebase/auth";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authUser } = useAuth();
    const [redirectTo, setRedirectTo] = useState(false);

    const signIn = async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        await signInWithEmailAndPassword(auth, email, password);
        if (authUser) {
            setRedirectTo(true);
        }
    }

    if (redirectTo) {
        return <Navigate to="/account" />;
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl  text-center mb-4">Login</h1>
                <form onSubmit={signIn} className="max-w-md mx-auto">
                    <input 
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button type="submit" className="primary">Signin</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't Have an Account? <Link className="underline text-black" to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
