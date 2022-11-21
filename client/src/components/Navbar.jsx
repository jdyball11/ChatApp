import { signOut } from 'firebase/auth'
import { FaRocketchat } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { auth } from '../Firebase-config'


const Navbar = () => {
    return (
        <div className="flex items-center gap-3 text-dcBlue text-3xl font-bold p-6">
            <div>
                <FaRocketchat />ChatApp
            </div>
            <div>
                <MdLogout onClick={()=>signOut(auth)}/>
            </div>
        </div>
    )
}

export default Navbar