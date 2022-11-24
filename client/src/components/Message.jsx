import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'
import { Timestamp } from 'firebase/firestore'
import { redirect } from 'react-router-dom'

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    // console.log(message)
    const [imgSrc, setImgSrc] = useState(data.user.photoURL);
    // console.log("data.user.photoURL", data.user.photoURL)
    // console.log("imgSrc", imgSrc)

    useEffect(() => {
        setImgSrc(data.user.photoURL)
    }, [data.user.photoURL])

    const handleError = () => setImgSrc("/xmark-solid.svg");

    const ref = useRef()

    
    
    const convertDate = (time) => {
        let dateInMillis = time * 1000
        let date = new Date(dateInMillis)
        let myDate = date.toLocaleDateString()
        let myTime = date.toLocaleTimeString()
        myDate = myDate.replaceAll('/', '-')

        return myDate + " " + myTime

    }
    const messageTime = convertDate(message.date.seconds)

    return (
        <>
            {message.senderId === currentUser.uid && <div className='border-dcBlue flex justify-end gap-3'>
                {/* profile picture */}
                <div className='flex flex-col'>
                    <img src={currentUser.photoURL} alt="profile picture"
                        className='flex w-12 aspect-square rounded-full object-cover' />
                </div>
                {/* message body */}
                <div>
                    <div className='flex gap-2'>
                        <div className='font-bold'>{currentUser.displayName}</div>
                        <div>{messageTime}</div>
                    </div>
                    <div className='bg-dcBlue py-2 px-3 text-white rounded-xl flex flex-wrap break-all
                    max-w-xs dark:text-gray-900'>{message.text}</div>
                    {message.img && <img src={message.img} className="max-w-xs"/>}
                </div>


            </div>}
            {message.senderId === data.user.uid && <div className='border-dcBlue flex justify-start gap-3'>
                {/* profile picture */}
                <div className='flex flex-col'>
                    <img src={imgSrc} alt="profile picture" onError={handleError}
                        className='w-12 aspect-square rounded-full object-cover' />
                </div>
                {/* message body */}
                <div>
                    <div className='flex gap-2'>
                        <div className='font-bold'>{data.user.displayName}</div>
                        <div>{messageTime}</div>
                    </div>
                    <div className='bg-blue-300 py-2 px-3 text-white rounded-xl flex flex-wrap break-all dark:text-gray-900'>{message.text}</div>
                    {message.img && <img src={message.img} className="w-20" />}
                </div>


            </div>}
        </>
    )
}

export default Message