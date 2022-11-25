import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { signOut } from 'firebase/auth'
import { FaRocketchat } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { FiEdit2 } from "react-icons/fi";
import { doc, getDoc } from "firebase/firestore";
import { db, auth, storage } from "../Firebase-config"
import { ref as ref_db, remove} from 'firebase/database';
import { RealTimeDB } from '../Firebase-config';
import { MdLogin } from 'react-icons/md';
import { AuthContext } from "../contexts/AuthContext";
import { async } from '@firebase/util';
import DeleteModal from "./DeleteModal"
import Switcher from "./Switcher"

const UserProfile = () => {
    const {currentUser} = useContext(AuthContext)
    const [userAbout, setUserAbout] = useState("") 
    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const getUserCol = async () =>{
            if (currentUser !== null) {
                let userDoc = doc(db, "users", currentUser?.uid)
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

    const handleClickSignOut = async () => {
            try {
                await remove(ref_db(RealTimeDB, "OnlineStatus/" + currentUser.uid))
                signOut(auth)
            } catch (error) {
                console.log(error.message)
            }
        }

    return (
        <>
        <div className="flex flex-col gap-12 h-screen bg-dcBlue dark:bg-gray-900">
            {/* Navbar */}
            <div className="flex flex-row items-center justify-between gap-3 text-lightWhite font-bold p-4">
                {/* Brand */}
                <div className='flex gap-2 items-center font-bold text-3xl'>
                    <Link to="/chatapp/home"><FaRocketchat /></Link>
                </div>
                {/* User */}
                <div className='flex gap-1 items-center text-md'>
                    <Link to="/chatapp/userprofile" className="flex items-center">
                        <img src={currentUser?.photoURL} alt="profile picture" className='w-9 h-9 object-cover rounded-full mr-2'/>
                        <span>{currentUser?.displayName}</span>
                    </Link>
                    <Switcher />
                    <MdLogout onClick={handleClickSignOut} className="cursor-pointer" />
                </div>
            </div>
            
            {/* Body/Content */}
            <div className="flex justify-center items-center">
                <div 
                    className="flex flex-col gap-6 justify-center items-center rounded-lg mx-3 p-6 bg-lightWhite filter shadow-2xl shadow-gray-500 w-fit dark:text-white dark:bg-gray-900 dark:shadow-darkRounded">
                    <div className="flex justify-between relative">
                        <Link to="/chatapp/profile" 
                            className="absolute right-0 flex justify-center items-center text-dcBlue text-2xl w-fit h-fit p-2 rounded-full hover:bg-gradient-to-r from-sky-200 to-indigo-200">
                            <FiEdit2 />
                        </Link>
                        <img src={currentUser?.photoURL} alt={currentUser?.displayName} className="w-80 h-80 rounded-full m-auto object-cover dark:border-slate-300" />
                    </div>
                    <div className="flex flex-col items-start gap-y-2 text-dcBlue text-md font-bold mt-2">
                        <p>Display Name: {currentUser?.displayName}</p>
                        <p>Email Address: {currentUser?.email}</p>
                        {userAbout ? <p className="max-w-sm">About: {userAbout}</p> : <p className="max-w-sm">About: <span className="text-slate-300 dark:text-slate-700"><em>about yourself...</em></span></p>}
                    </div>
                    <div className="flex justify-end">
                        <button 
                            className="w-fit rounded-full border border-transparent bg-red-600 px-3 py-2 text-white text-xs font-bold hover:shadow-lg hover:bg-red-700 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:hover:shadow-lightRounded"
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