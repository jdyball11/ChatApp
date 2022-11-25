import { signOut } from 'firebase/auth'
import { FaRocketchat } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { auth } from '../Firebase-config'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Link } from "react-router-dom"
import { ref, onDisconnect, remove } from "firebase/database"
import { RealTimeDB } from "../Firebase-config"

import Switcher from "./Switcher"

const Navbar = ({handleSidebarShow}) => {
    const { currentUser } = useContext(AuthContext)

    const HandleSignOut = async () => {
        try {
            await remove(ref(RealTimeDB, "OnlineStatus/" + currentUser.uid))
            signOut(auth)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="flex flex-row items-center justify-between gap-3 
        bg-blue-900 text-lightWhite p-4 dark:bg-gray-800">
            {/* Brand */}
            <div className='flex gap-2 items-center font-bold text-3xl'>
                <FaRocketchat onClick={()=>handleSidebarShow(false)}/>
            </div>
            {/* User */}
            <div className='flex gap-1 items-center text-md font-bold'>
                <Link to="/chatapp/userprofile" className="flex items-center gap-2">
                    <img src={currentUser.photoURL} alt="profile picture" className='w-10 h-10 object-cover rounded-full'/>
                    <span>{currentUser.displayName}</span>
                </Link>
                <Switcher />
                <MdLogout onClick={HandleSignOut} className="cursor-pointer"/>
            </div>
           
        </div>
    )
}

export default Navbar