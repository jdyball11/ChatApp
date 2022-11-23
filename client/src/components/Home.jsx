// import { onSnapshot, QuerySnapshot } from "@firebase/firestore";
// import { useEffect, useState, useRef } from "react";
// import { query, collection, orderBy } from 'firebase/firestore';
// import { db } from '../Firebase-config'
// import Messages from "./Messages";
import Navbar from "./Navbar";
import Search from "./Search";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Contacts from "./Contacts";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { FaRocketchat } from "react-icons/fa";

const Home = () => {
    const { currentUser } = useContext(AuthContext)
    
    return (
        <div className="grid transition-all overflow-x-hidden relative
        sm:grid-cols-[300px_auto]">

            <Sidebar className="z-10 fixed " />

            <Chat />
        </div>

    )
}

export default Home