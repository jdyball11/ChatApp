import React, { useEffect, useState, useContext } from 'react'
import Message from './Message'
import { ChatContext } from '../contexts/ChatContext'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase-config'


const Messages = () => {
    const [messages, setMessages] = useState([])
    // access the data:state in ChatContext
    const { data } = useContext(ChatContext)

    useEffect(() => {
        // remember to wrap the useEffect in a function with condition to make sure it only runs 
        // when the third variable, in this case data.chatId is available
        const getMessages = () => {
            const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                // setMessages with doc.data() if a chat alreayd exists
                doc.exists() && setMessages(doc.data().messages)
            });
            return () => {
                unsub();
            }
        };
        data.chatId && getMessages()
    }, [data.chatId]);

    return (
        // the messages
        <div className='flex flex-col gap-5 p-3 overflow-auto h-full'>
            {messages.map((message) => (
                <Message message={message} key={message.id} />
            ))}
        </div>
    )
}

export default Messages