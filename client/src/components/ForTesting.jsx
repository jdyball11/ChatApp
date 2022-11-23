
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"

import { doc, getDoc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { db, auth, storage } from "../Firebase-config"

const ForTesting = () => {
    
    const user = useContext(AuthContext).currentUser
    console.log("LOGIN USER: ", user)
    console.log("UID: ",user.uid)

    // e53JcBEYNlVWkmuaKb2KIjdZv7q1
    const testingQuery = async () => {
        const q = query(collection(db, "chats"), where("participants", "array-contains", user.uid));

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        querySnapshot.forEach( (doc) => {
        // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let a = doc.id
            updateDoc(doc(db, "chats", a), {
            isActive: false
            })
        });

        const testRef = doc(db, "chats", "e53JcBEYNlVWkmuaKb2KIjdZv7q13GNcIy4yk4fYSv5f5CujxEvhWMF2")
        const testSnap = await getDoc(testRef)
        console.log(testSnap.data())

        // const querySnapshot = await getDocs(collection(db, "chats"));
        //     console.log(querySnapshot)
        //     querySnapshot.forEach((doc) => {
        //         console.log(doc.id)
        //         if (doc.id.includes(user.uid)) {
        //             console.log("INCLUDES: ", doc.id)
        //             let docRef = doc(db, "chats", doc.id)
        //             updateDoc(docRef, {
        //                 isActive: false
        //             })
        //             console.log(doc.data().isActive)
        //         }
        //     });
    }
    testingQuery()
    
    return <p>Something test</p>
}

export default ForTesting