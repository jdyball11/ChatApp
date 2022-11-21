import { useContext, useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom"

import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../Firebase-config"
import { deleteUser } from "firebase/auth";

import { MdLogin } from 'react-icons/md';
import { AuthContext } from "../AuthContext";
import Navbar from "./Navbar"
import { async } from '@firebase/util';
// import DeleteModal from "./DeleteModal"

const UserProfile = () => {
    const {currentUser} = useContext(AuthContext)
    const [userAbout, setUserAbout] = useState("") 
    const user = auth.currentUser
    const navigate = useNavigate()

    useEffect(() => {
        const getUserCol = async () =>{
            if (currentUser !== null) {
                let userDoc = doc(db, "users", currentUser.uid)
                console.log("User Collection Ref: ", userDoc)
                const userDocSnap = await getDoc(userDoc)
                if (userDocSnap.exists()) {
                    console.log("userDocSnap  :", userDocSnap.data());
                    setUserAbout(userDocSnap.data().about)
                }
            }
        }
        getUserCol()
    }, [currentUser])

    const handleDeleteAccount = async () => {
        await deleteDoc(doc(db, "users", user.uid)); // currentUser.uid does not work
        console.log("Doc deleted");
        await deleteUser(user)
            .then(() => {
                // User deleted.
                console.log("User & doc deleted");
                navigate('/chatapp/register')
          }).catch((error) => {
                // An error ocurred
                console.log(error);
          });
    }

    return (
        <>
        <div className="flex flex-col gap-12 bg-sky-500/50 h-screen">
            <Navbar />
            <div className="flex flex-col gap-6 justify-center items-center rounded-lg
                mx-3 p-6 bg-lightWhite filter shadow-2xl shadow-gray-500">
                <Link to="/chatapp/profile" className="text-materialBlack">Edit Profile</Link>
                <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-80 h-80 rounded-full m-auto object-cover" />
                <div className="flex flex-col items-start gap-y-2">
                    <p className="text-dcBlue text-xl">Display Name: <span className="text-materialBlack">{currentUser.displayName}</span></p>
                    <p className="text-dcBlue text-xl">Email Address: <span className="text-materialBlack">{currentUser.email}</span></p>
                    <p className="text-dcBlue text-xl">About: <span className="text-materialBlack">{userAbout}</span></p>
                    <p className="text-dcBlue text-xl">Status: <span className="text-materialBlack">Online/Away/Busy/Invisible</span></p>
                    <p className="text-dcBlue text-xl">Theme Mode: <span className="text-materialBlack">toggle: dark/light</span></p>
                    <button 
                        className="w-full rounded border border-transparent bg-red-600 px-4 py-2 hover:bg-red-700 hover:text-gray-300 text-white font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3"
                        onClick={handleDeleteAccount} >
                            Deactivate Account
                    </button>

                </div>
            </div>

        </div>
        </>
    )
}
// https://firebasestorage.googleapis.com/v0/b/chatapp-a6fdf.appspot.com/o/Test%202?alt=media&token=d735676f-651d-4351-9e90-128e4c522d58
export default UserProfile


// w-full rounded border border-transparent bg-red-600 px-4 py-2 hover:bg-red-700 hover:text-materialBlack text-white font-bold 
// w-full rounded border border-transparent bg-red-600 px-4 py-2 hover:bg-red-700 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm