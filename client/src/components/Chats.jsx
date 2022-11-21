import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { db } from '../Firebase-config'
import { doc, onSnapshot } from 'firebase/firestore'
import { ChatContext } from '../contexts/ChatContext'

const Chats = () => {
    const [chats, setChats] = useState([])

    const { currentUser } = useContext(AuthContext)
    const { dispatch, ACTIONS } = useContext(ChatContext)

    useEffect(() => {
        const getChats = () => {
            // get realtime updates "onSnapshot()" method from firestore
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            })

            return () => {
                unsub()
            }
        }
        currentUser.uid && getChats()
    }, [currentUser.uid])
    console.log(ACTIONS.CHANGE_USER)

    const handleSelect = (u) => {
        dispatch({ type: ACTIONS.CHANGE_USER, payload: u })
    }

    return (
        // chats
        <div>
            {/* Object.entries(obj) return the key, value pair of the object as key: value in an array */}
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                // individual chat
                <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}
                    className="flex items-center p-3 gap-3">
                    <img src={chat[1].userInfo.photoURL} alt="profile picture"
                        className="w-16 aspect-square object-cover rounded-full" />
                    <div className='text-dcBlue'>
                        <div className='text-2xl font-bold'>{chat[1].userInfo.displayName}</div>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats