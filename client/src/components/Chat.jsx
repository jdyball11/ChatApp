import { onSnapshot, QuerySnapshot } from "@firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { query, collection, orderBy } from 'firebase/firestore';
import { db } from '../Firebase-config'
import Messages from "./Messages";

const Chat = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {

        const queryData = query(collection(db, 'messages'), orderBy('timestamp'))
        const unsubscribe = onSnapshot(queryData, (QuerySnapshot) => {
            let messages = []
            console.log(QuerySnapshot)
            // QuerySnapshot.forEach((doc) => {
            //     // messages.push({...doc.data(), id: doc.id})
            //     console.log(doc)
            // })
            setMessages(messages)
        })
        return () => unsubscribe();
    }, [])

    return (
    <>
        <div>
            {messages.map((message) => <Messages message={message}/>)}
        </div>
    </>
    )
}

export default Chat