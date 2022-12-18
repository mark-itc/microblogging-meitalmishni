import { createContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from "../firebase";

const UserContext = createContext();

function UserContextProvider({ children }) {
    //const [username, setUsername] = useState('');
    const [user, setUser] = useState('');

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const getCurrentUser = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, signUp, logout, signIn, googleSignIn }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };