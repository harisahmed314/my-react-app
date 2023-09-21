import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./firebase";
import { EmailAuthProvider } from "firebase/auth";
import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";





const AuthUserContext = createContext({
    authUser: null,
    isLoading: true,
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const clear = () => {
        setAuthUser(null);
        setIsLoading(false);
    };

    const changePassword = async (currentPassword, newPassword) => {
        if (!authUser) {
            console.error("User not authenticated");
            return;
        }
    
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        );
    
        try {
            // Re-authenticate user
            await reauthenticateWithCredential(user, credential);
    
            // Update the user's password
            await updatePassword(user, newPassword);
            console.log("Password updated successfully");
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };
    

    const authStateChanged = async (user) => {
        setIsLoading(true);
        if (!user) {
            clear();
            return;
        }
        setAuthUser({
            uid: user.uid,
            email: user.email,
            username: user.displayName,
            photoURL: user.photoURL,
        });
        setIsLoading(false);
    };

    const signOut = () => {
        authSignOut(auth).then(() => clear());
    };

    const changeProfilePic = async (newProfilePicURL) => {
        if (!authUser) {
            console.error("User not authenticated");
            return;
        }
    
        const user = auth.currentUser;
    
        try {
            await updateProfile(user, {
                photoURL: newProfilePicURL
            });
            console.log("Profile picture updated successfully");
    
            // Optionally update the state to reflect the change immediately
            setAuthUser(prevState => ({ ...prevState, photoURL: newProfilePicURL }));
        } catch (error) {
            console.error("Error updating profile picture:", error);
        }
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
        changePassword,
        changeProfilePic,
        
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