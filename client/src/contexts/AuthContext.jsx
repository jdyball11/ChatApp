import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase-config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        //authstatechanged will trigger the current user state once a connection with Firebase has been established.
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            console.log("logged in reg", user)
        });
    }, []);
    
    return (
        //passing logged in user: currentUser down to all routes(children) within authcontext provider
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
};
