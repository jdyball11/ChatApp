import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useContext } from 'react'
import { ChatContext } from '../contexts/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase-config'


const Messages = () => {
    const [messages, setMessages] = useState([])
    // access the data:state in ChatContext
    const { data } = useContext(ChatContext)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            // setMessages with doc.data() if a chat alreayd exists
            doc.exists() && setMessages(doc.data().messages)
        })
        return () => {
            unsub()
        }
    }, [data.chatId])

    return (
        // the messages
        <div>
            {messages.map(message =>
                <Message message={message} key={message.id}/>
            )}
        </div>
    )
}

export default Messages