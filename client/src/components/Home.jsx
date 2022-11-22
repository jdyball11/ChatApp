// import { onSnapshot, QuerySnapshot } from "@firebase/firestore";
// import { useEffect, useState, useRef } from "react";
// import { query, collection, orderBy } from 'firebase/firestore';
// import { db } from '../Firebase-config'
// import Messages from "./Messages";
import Navbar from "./Navbar";
import Search from "./Search";
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Chats from "./Chats";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

const Home = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className="flex">
            <div>
                <Sidebar />
                {/* <Link to="/chatapp/profile" className="text-dcBlue">Edit Profile (For testing purpose)</Link> */}
            </div>
            <Chat />
            
        </div>

    )
}

export default Home