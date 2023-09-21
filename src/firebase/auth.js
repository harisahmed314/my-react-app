import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./firebase";





const AuthUserContext = createContext({
    authUser: null,
    isLoading: true,
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    
    
    const signOut = () => {
        authSignOut(auth).then(() => clear());
    };

    const authStateChanged = (user) => {
        setAuthUser(user);
        setIsLoading(false);
    };
    
    const clear = () => {
        setAuthUser(null);
        setIsLoading(true); // Only if you want to set it as loading after signing out
    };
    

    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        isLoading,
        signOut,
        setAuthUser,
        
    };
}


export const AuthUserProvider = ({ children }) => {
    const auth = useFirebaseAuth();
    return (
        <AuthUserContext.Provider value={auth}>
            {children}
        </AuthUserContext.Provider>
    );
};

export const useAuth = () => useContext(AuthUserContext);

