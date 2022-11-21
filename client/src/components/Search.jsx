import { useContext, useState } from "react"
import { collection, query, where, getDocs, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase-config";
import { AuthContext } from "../AuthContext";
import { serverTimestamp } from "firebase/firestore";


const Search = () => {
    const [username, SetUsername] = useState("")
    const [user, SetUser] = useState(null)
    const [error, setError] = useState(false)
    const { currentUser } = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(collection(db, "users"),
            where("displayName", "==", username)
        );
    
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
            SetUser(doc.data())
            }); 
        } catch (error) {
            console.log(error.message)
            setError(true)
        }
    }

    const handleEnter = (e) => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        try {
        const res = await getDoc(doc(db, "chats", combinedId))
            if (!res) {
                await setDoc(doc, db, "chats", combinedId, { messages: [] })
                
                await updateDoc(doc(db, "chats", combinedId.uid), {
                    [combinedId+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoUrl: currentUser.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
            }
            console.log(res)
        } catch (error) {
            console.log("error msg:", error.message)
        }
    }

    return (

        <div className="">
            <div>
                <input className="text-black" type="text" placeholder="Search Friend" onKeyDown={handleEnter} onChange={event => SetUsername(event.target.value)} value={username}/>
            </div>
            {error && <span>User not found</span>}
            {user && <div className="" onClick={handleSelect}>
            <img className="w-40" src={user?.photoURL} />
            <div>
                <span className="text-black">{user?.displayName}</span>
            </div>
            </div>}
        </div>
    )
}

export default Search