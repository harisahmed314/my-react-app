import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../firebase/auth";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";



export default function Account() {
    const { authUser, signOut } = useAuth();
    let { subpage } = useParams();
    const [shouldRedirect, setShouldRedirect] = useState(false);  

    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await signOut();
        setShouldRedirect(true); 
    }


    useEffect(() => {
        if (!authUser) {
            setShouldRedirect(true);
        }
    }, [authUser]);

    



    if (shouldRedirect) {
        return <Navigate to="/" replace />; 
    }


    if (!authUser) {  
        return null;
    }

    return (
        <>
            <AccountNav />
            {subpage === 'profile' && (  
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {authUser.email} <br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </>
    );
    
}
  


    