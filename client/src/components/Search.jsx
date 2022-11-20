import { useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase-config";

const Search = () => {
    const [username, SetUsername] = useState("")
    const [user, SetUser] = useState(null)
    const [error, setError] = useState(false)

    console.log(user)

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

    return (

        <div className="">
            <div>
                <input type="text" placeholder="Search Friend" onKeyDown={handleEnter} onChange={event => SetUsername(event.target.value)}/>
            </div>
        </div>
    )
}

export default Search