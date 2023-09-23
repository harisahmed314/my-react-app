import React, { useState } from 'react'
import { auth } from '../config/config'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';



const LoginPage = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then(() => {
            setEmail('');
            setPassword('');
            setError('');
            navigate('/');  // Notice it's "navigate", not "push"
        }).catch(err => setError(err.message));
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error if it exists */}
                <form onSubmit={login} className="max-w-md mx-auto">
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

export default LoginPage;