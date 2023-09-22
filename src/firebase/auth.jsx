import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth as firebaseAuth } from "./firebase";

const AuthUserContext = createContext({
    authUser: null,
    isLoading: true,
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const signOut = () => {
        authSignOut(firebaseAuth)
            .then(() => clear())
            .catch(error => console.error("Error signing out:", error));
    };

    const authStateChanged = (user) => {
        setAuthUser(user);
        setIsLoading(false);
    };
    
    const clear = () => {
        setAuthUser(null);
        setIsLoading(true);
    };
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        isLoading,
        signOut,
        setAuthUser, // Consider wrapping this in an action if needed
    };
}

export const AuthUserProvider = ({ children }) => {
    const authContextValues = useFirebaseAuth();
    return (
        <AuthUserContext.Provider value={authContextValues}>
            {children}
        </AuthUserContext.Provider>
    );
};

export const useAuth = () => useContext(AuthUserContext);
