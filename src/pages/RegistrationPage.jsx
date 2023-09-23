import React, { useState } from 'react'
import { auth, db } from '../config/config'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'


const  RegistrationPage=(props) => {

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // signup
    const signup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email, password).then((cred) => {
            db.collection('SignedUpUsersData').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                props.history.push('/login');
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl  text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={signup} >
                    <input type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <input type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}

                    />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button type="submit" className="primary">Register</button>
                    {error && <span className='error-msg'>{error}</span>}
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" >Login</Link>
                    </div>
                </form>
            </div>
        </div>

    )
}


export default RegistrationPage;