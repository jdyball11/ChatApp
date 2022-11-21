// import { onSnapshot, QuerySnapshot } from "@firebase/firestore";
// import { useEffect, useState, useRef } from "react";
// import { query, collection, orderBy } from 'firebase/firestore';
// import { db } from '../Firebase-config'
// import Messages from "./Messages";
import Navbar from "./Navbar";
import Search from "./Search";
import {Link} from "react-router-dom"

const Chat = () => {

    return (
        <div>
            <Navbar />
            <Search />
            <Link to="/chatapp/profile" className="text-dcBlue">Edit Profile (For testing purpose)</Link>
        </div>

    )
}

export default Chat