import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react"
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";







export default function RegistrationPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Handle the signed-in user here
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                // Handle the error here
                console.error("Error signing in:", error.message);
            });
    }
    return (
            <div className="mt-4 grow flex items-center justify-around">
                <div className="mb-64">
                    <h1 className="text-4xl  text-center mb-4">Register</h1>
                    <form className="max-w-md mx-auto"  onSubmit={signUp} >
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
                        <div className="text-center py-2 text-gray-500">
                            Already a member? <Link className="underline text-black" >Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        
    )
}