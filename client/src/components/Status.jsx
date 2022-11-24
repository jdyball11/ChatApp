import { useState, useEffect, useContext } from "react"
import { ref, onValue } from "firebase/database"
import { AuthContext } from "../contexts/AuthContext"
import { db } from "../Firebase-config"
import { doc } from "firebase/firestore"
import { RealTimeDB } from "../Firebase-config"
import { BsFillCircleFill } from "react-icons/bs"

const Status = ({chat}) => {
    const [online, setOnline] = useState(true)
    const currentUser = useContext(AuthContext)
    console.log(chat.userInfo.uid)
    useEffect(() => {
		return onValue(ref(RealTimeDB, "OnlineStatus/" + chat.userInfo.uid), (snapshot) => {

			if (snapshot.exists()) {
				setOnline(true)
			} else {
				setOnline(false)
			}
		})
    }, [online])


    return (
        <div>
           <div className={`${online ? "text-green-400" : "text-neutral-400"} `}>
           <BsFillCircleFill />
           </div>
        </div>
    )
}



export default Status



