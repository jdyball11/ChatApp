import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase-config";
import { createContext, useEffect, useState } from "react";
import { set, ref, onDisconnect } from "firebase/database"
import { RealTimeDB } from "../Firebase-config"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        //authstatechanged will trigger the current user state once a connection with Firebase has been established.
        onAuthStateChanged(auth, (user) => {
            if (user) {
                set(ref(RealTimeDB, "OnlineStatus/" + user.uid), "user online")
                console.log("logged in reg", user)
                setCurrentUser(user)
            } else {
                if (currentUser !== null) {
                    setCurrentUser(null)
                }
                
            }
            
        });
    }, []);
    
    return (
        //passing logged in user: currentUser down to all routes(children) within authcontext provider
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
};
