import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'
import Status from './Status'

const Contact = ({ chat, handleSidebarShow }) => {
    const { dispatch, ACTIONS } = useContext(ChatContext)
    const [imgSrc, setImgSrc] = useState(chat[1].userInfo.photoURL);
    // console.log("data.user.photoURL", data.user.photoURL)
    // console.log("imgSrc", imgSrc)

    useEffect(() => {
        setImgSrc(chat[1].userInfo.photoURL)
    }, [chat[1].userInfo.photoURL])

    const handleError = () => setImgSrc("/xmark-solid.svg");

    const handleSelect = (u) => {
        dispatch({ type: ACTIONS.CHANGE_USER, payload: u })
        handleSidebarShow(false)
    }

    return (
        <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}
            className="grid grid-cols-[auto_1fr_16px] items-center p-4 gap-4 w-full dark:hover:bg-slate-600 hover:bg-blue-800">
            <img src={imgSrc} onError={handleError} alt="profile picture"
                className="w-16 aspect-square object-cover rounded-full text-lightWhite" />
            <div className='text-lightWhite'>
                <div className='text-lg font-bold'>{chat[1].userInfo.displayName}</div>
                <p className='break-all'>{chat[1].lastMessage?.text.slice(0, 15)}{chat[1].lastMessage?.text.length > 15 && "..."}</p>
            </div>
            <Status chat={chat[1]} />
        </div>
    )
}

export default Contact