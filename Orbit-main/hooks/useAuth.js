import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth } from "../config";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logOut() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, []);
    
 const memoedValue = useMemo(() => ({

 }), [])


  return (
    <AuthContext.Provider 
        value={{user, signUp, logIn, logOut}}
    >
        {children}
    </AuthContext.Provider>
  )
};

export default function useAuth() {
    return useContext(AuthContext);
}
