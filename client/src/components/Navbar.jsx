import { signOut } from 'firebase/auth'
import { FaRocketchat } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { auth } from '../Firebase-config'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'


const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className="flex flex-row items-center justify-between gap-3 text-dcBlue p-4">
            {/* Brand */}
            <div className='flex gap-2 items-center font-bold text-xl'>
                <FaRocketchat />Chat
            </div>
            {/* User */}
            <div className='flex gap-2 items-center text-xl'>
                <img src={currentUser.photoURL} alt="profile picture" className='w-9 h-9 object-cover'/>
                <div>{currentUser.displayName}</div>
                <MdLogout onClick={()=>signOut(auth)}/>
            </div>
           
        </div>
    )
}

export default Navbar