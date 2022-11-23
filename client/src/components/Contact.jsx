import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'

const Contact = ({ chat }) => {
    const { dispatch, ACTIONS } = useContext(ChatContext)
    const [imgSrc, setImgSrc] = useState(chat[1].userInfo.photoURL);
    // console.log("data.user.photoURL", data.user.photoURL)
    console.log("imgSrc", imgSrc)

    useEffect(() => {
        setImgSrc(chat[1].userInfo.photoURL)
    }, [chat[1].userInfo.photoURL])

    const handleError = () => setImgSrc("/xmark-solid.svg");

    const handleSelect = (u) => {
        dispatch({ type: ACTIONS.CHANGE_USER, payload: u })
    }
    return (
        <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}
            className="flex items-center p-4 gap-4 w-full">
            <img src={imgSrc} onError={handleError} alt="profile picture"
                className="w-16 aspect-square object-cover rounded-full text-lightWhite" />
            <div className='text-lightWhite'>
                <div className='text-lg font-bold'>{chat[1].userInfo.displayName}</div>
                <p>{chat[1].lastMessage?.text.slice(0, 20)}...</p>
            </div>
        </div>
    )
}

export default Contact