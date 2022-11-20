import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase-config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, SetUser] = useState({})

    useEffect(() => {
        //authstatechanged will trigger the current user state once a connection with Firebase has been established.
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            SetUser(user)
        })
        return () => {
            unsubscribe()
        }
    }, []);
    return (
    //passing logged in user down to all routes(children) within authcontext provider
    <AuthContext.Provider value={{user}}>
        {children}
    </AuthContext.Provider>  
    )
};
