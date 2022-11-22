import { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { signOut } from 'firebase/auth'
import { FaRocketchat } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { FiEdit2 } from "react-icons/fi";

import { doc, getDoc } from "firebase/firestore";
import { db, auth, storage } from "../Firebase-config"

import { MdLogin } from 'react-icons/md';
import { AuthContext } from "../contexts/AuthContext";
import { async } from '@firebase/util';
import DeleteModal from "./DeleteModal"

const UserProfile = () => {
    const {currentUser} = useContext(AuthContext)
    const [userAbout, setUserAbout] = useState("") 
    const [showModal, setShowModal] = useState(false)    

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

    const handleOnClose = () => {
        setShowModal(false)
    }

    return (
        <>
        <div className="flex flex-col gap-12 bg-dcBlue h-screen">
            {/* Navbar */}
            <div className="flex flex-row items-center justify-between gap-3 text-lightWhite font-bold p-4">
                {/* Brand */}
                <div className='flex gap-2 items-center font-bold text-xl'>
                    <FaRocketchat />Chat
                </div>
                {/* User */}
                <div className='flex gap-2 items-center text-xl'>
                    <Link to="/chatapp/userprofile" className="flex items-center">
                        <img src={currentUser.photoURL} alt="profile picture" className='w-9 h-9 object-cover rounded-full'/>
                        <span>{currentUser.displayName}</span>
                    </Link>
                    <MdLogout onClick={()=>signOut(auth)}/>
                </div>
            </div>
            
            {/* Body/Content */}
            <div className="flex justify-center items-center">
            <div className="flex flex-col gap-6 justify-center items-center rounded-lg mx-3 p-6 bg-lightWhite filter shadow-2xl shadow-gray-500 w-fit">
                <div className="flex justify-between relative">
                    <Link to="/chatapp/profile" className="absolute right-0 flex justify-center items-center text-dcBlue text-2xl w-fit h-fit p-2 rounded-full hover:bg-gray-300"><FiEdit2 /></Link>
                    <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-80 h-80 rounded-full m-auto object-cover" />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                    <p className="text-dcBlue text-xl">Display Name: <span className="text-materialBlack">{currentUser.displayName}</span></p>
                    <p className="text-dcBlue text-xl">Email Address: <span className="text-materialBlack">{currentUser.email}</span></p>
                    <p className="text-dcBlue text-xl">About: <span className="text-materialBlack">{userAbout ? userAbout : "..."}</span></p>
                    <p className="text-dcBlue text-xl">Status: <span className="text-materialBlack">Online/Away/Busy/Invisible</span></p>
                    <p className="text-dcBlue text-xl">Theme Mode: <span className="text-materialBlack">toggle: dark/light</span></p>
                    <button 
                        className="w-full rounded border border-transparent bg-red-600 px-4 py-2 hover:bg-red-700 hover:text-gray-300 text-white font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={() => {setShowModal(true)}} >
                            Deactivate Account
                    </button>
                </div>
                <DeleteModal onClose={handleOnClose} visible={showModal} />
            </div>
            </div>
        </div>
        </>
    )
}

export default UserProfile