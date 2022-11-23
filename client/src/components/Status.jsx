import { useState, useEffect, useContext } from "react"
import { ref, onValue } from "firebase/database"
import { AuthContext } from "../contexts/AuthContext"
import { db } from "../Firebase-config"
import { doc } from "firebase/firestore"
import { RealTimeDB } from "../Firebase-config"

const Status = () => {
    const [online, SetOnline] = useState(false)
    const currentUser = useContext(AuthContext)

    let userDoc = doc(db, "users", currentUser?.uid)

        useEffect(() => {

            return onValue(ref(db, userDoc), (snapshot) => {
                console.log("status", snapshot.exists())
            })
        }, [])
}

export default Status



