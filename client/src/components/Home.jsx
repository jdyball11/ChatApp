// import { onSnapshot, QuerySnapshot } from "@firebase/firestore";
// import { useEffect, useState, useRef } from "react";
// import { query, collection, orderBy } from 'firebase/firestore';
// import { db } from '../Firebase-config'
// import Messages from "./Messages";
import Navbar from "./Navbar";
import Search from "./Search";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Chats from "./Contacts";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

const Home = () => {
    const { currentUser } = useContext(AuthContext)
    const [ sideBarOn, setSideBarOn ] = useState(false)
    const handleSetSideBar = (sidebarToggle) => {
        setSideBarOn(sidebarToggle)
    }
    return (
        <div className="grid grid-cols-[300px_auto] transition-all overflow-x-hidden">

            {sideBarOn && <Sidebar className="z-10 fixed w-[300px] transition-all" handleSetSideBar={handleSetSideBar}/>}

            <Chat handleSetSideBar={handleSetSideBar}/>
        </div>

    )
}

export default Home