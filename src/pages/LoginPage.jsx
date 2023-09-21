import React, { useState } from "react";
import { Link } from "react-router-dom";




export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return(
        <div className="mt-4 grow flex items-center justify-around">
                <div className="mb-64">
                    <h1 className="text-4xl  text-center mb-4">Register</h1>
                    <form className="max-w-md mx-auto"  >
                        
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
                            Don't Have an Acoount? <Link className="underline text-black" >Register</Link>
                        </div>
                    </form>
                </div>
            </div>
    )
}