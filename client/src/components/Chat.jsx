// import { onSnapshot, QuerySnapshot } from "@firebase/firestore";
// import { useEffect, useState, useRef } from "react";
// import { query, collection, orderBy } from 'firebase/firestore';
// import { db } from '../Firebase-config'
// import Messages from "./Messages";
import { Link } from 'react-router-dom'
import Search from "./Search";

const Chat = () => {
    
    return (
    <>
        <Search />
        <Link to="/chatapp/editProfile">Edit Profile</Link>
    </>
        )
}

export default Chat