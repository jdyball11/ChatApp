import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { doc, collection, getDocs, updateDoc, query, where } from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { db, auth, storage } from "../Firebase-config"

const ForTesting = () => {
    const user = useContext(AuthContext).currentUser
    console.log("LOGIN USER: ", user)
    console.log("UID: ", user.uid)
    // e53JcBEYNlVWkmuaKb2KIjdZv7q1
    const chatsIdList = []
    const testingQuery = async () => {
        const q = query(collection(db, "chats"), where("participants", "array-contains", user.uid));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            chatsIdList.push(doc.id)
        });

        console.log(chatsIdList)
        chatsIdList.forEach(async (chatId) => {
            let chatDocRef = doc(db, "chats", chatId)
            await updateDoc(chatDocRef, {
                isActive: false
            })
        })
    };
    testingQuery()
    
    return <p>Something test</p>
}

export default ForTesting

// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom"
// import { useState, useContext, useRef } from "react"

// import { doc, getDoc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
// import { query, where } from "firebase/firestore";
// import { ref, deleteObject, listAll } from "firebase/storage";
// import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
// import { db, auth, storage } from "../Firebase-config"
// import { useEffect } from "react";

// const ForTesting = () => {
    // const currentUserColRef = useRef("ab")
    // const user = useContext(AuthContext).currentUser
    // console.log("LOGIN USER: ", user)
    // console.log("UID: ",user.uid)

    // // e53JcBEYNlVWkmuaKb2KIjdZv7q1
    // const testingQuery = async () => {
    //     const q = query(collection(db, "chats"), where("participants", "array-contains", user.uid));

    //     const querySnapshot = await getDocs(q);
    //     // console.log(querySnapshot)
    //     // console.log(typeof querySnapshot)

    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.id, " => ", doc.data());
    //         currentUserColRef.current = doc.id
    //         console.log(currentUserColRef);
    //         console.log(currentUserColRef.current);
    //     })

    //     // querySnapshot.forEach( (doc) => {
    //     // // doc.data() is never undefined for query doc snapshots
    //     //     console.log(doc.id, " => ", doc.data());
    //     //     let a = doc.id
    //     //     updateDoc((db, "chats", a), {
    //     //     isActive: false
    //     //     })
    //     // });

    //     // const testRef = doc(db, "chats", "e53JcBEYNlVWkmuaKb2KIjdZv7q13GNcIy4yk4fYSv5f5CujxEvhWMF2")
    //     // const testSnap = await getDoc(testRef)
    //     // console.log(testSnap.data())
    // }
    // testingQuery()

    // useEffect(() => {
    //     const abc = async() =>{
    //         if (currentUserColRef.current !== "ab") {
    //         let a = doc(db, "chats", currentUserColRef.current)
    //             await updateDoc(a, {
    //                 isActive: false
    //             })
    //         }
    //     }
    //     // console.log("I assume done....?");
    //     abc()
    // }, [currentUserColRef.current])