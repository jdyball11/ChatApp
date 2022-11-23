import { useContext, useState } from "react"
import { collection, query, where, getDocs, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase-config";
import { AuthContext } from "../contexts/AuthContext";
import { serverTimestamp } from "firebase/firestore";
import { ChatContext } from "../contexts/ChatContext";


const Search = () => {
    // the search term
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const { dispatch, ACTION } = useContext(ChatContext)

    const handleSearch = async () => {
        // find in the users collection in firebase db, where displayName == username
        const q = query(collection(db, "users"),
            where("displayName", "==", username)
        );
        try {
            // setUser to to be the doc that is returned by getDocs from the q query
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (error) {
            console.log("no data from search", error.message)
            setError(true)
        }
    }
    // call handleSearch() when Enter key is pressed
    const handleEnter = (e) => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async () => {
        // check whether the chats in firestore db exist, if not create a new chat
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        try {
            const res = await getDoc(doc(db, "chats", combinedId))
            console.log(!res.exists())
            if (!res.exists()) {
                // create a chat in chats collection in firestore with an id == combinedId
                await setDoc(doc(db, "chats", combinedId), { isActive: true, participants:[
                    user.uid, currentUser.uid
                ], messages: [] })
                // update the userChats collection
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    // set the userInfo to contain the id, dName and photoURL of the other user (not current user*)
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, "userChats", user.uid), {
                    //  do the same for the other user in the chat
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
            console.log(res)
        } catch (error) {
            console.log("error msg:", error.message)
        }
        setUsername("")
        setUser(null)
    }

    return (

        <div className="border-b-2 text-lightWhite">
            {/* the search form */}
            <div className=" bg-dcBlue">
                <div className="p-2 text-lightWhite">
                    <input className="bg-transparent text-lightWhite outline-0 p-1 placeholder:text-lightWhite" type="text"
                        placeholder="Search Friend"
                        onKeyDown={handleEnter}
                        onChange={event => setUsername(event.target.value)}
                        value={username} />
                </div>
                {/* userChat */}
                {error && <span>User not found</span>}
                {user && <div onClick={handleSelect} className="flex items-center p-3 gap-3 cursor-pointer">
                    <img className="w-16 aspect-square object-cover rounded-full" src={user.photoURL} />
                    {/* userChat.info */}
                    <div>
                        <span className=" text-lightWhite text-2xl font-bold">{user.displayName}</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Search