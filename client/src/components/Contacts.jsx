import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { db } from '../Firebase-config'
import { doc, onSnapshot } from 'firebase/firestore'
import { ChatContext } from '../contexts/ChatContext'
import Contact from './Contact'

const Contacts = ({handleSidebarShow}) => {
    const [chats, setChats] = useState([])
    const [userImg, setUserImg] = useState(false)
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

    return (
        // chats
        <div className='overflow-auto bg-dcBlue w-full flex-col'>
            {/* Object.entries(obj) return the key, value pair of the object as key: value in an array */}
            {/* also, need to make sure chats is available before running the sort and map */}
            {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                // individual chat box
                <Contact chat={chat} handleSidebarShow={handleSidebarShow}/>
                // <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}
                //     className="flex items-center p-4 gap-4">
                //     <img src={chat[1].userInfo.photoURL} alt="profile picture"
                //         className="w-16 aspect-square object-cover rounded-full" />
                //     <div className='text-lightWhite'>
                //         <div className='text-lg font-bold'>{chat[1].userInfo.displayName}</div>
                //         <p>{chat[1].lastMessage?.text.slice(0, 20)}...</p>
                //     </div>
                // </div>
            ))}
        </div>
    )
}

export default Contacts