import React, { useEffect, useState } from 'react'
import { ChatContext } from '../contexts/ChatContext'
import { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { useImage } from 'react-image'



const Chat = () => {
    // access the data:state in ChatContext
    const { data } = useContext(ChatContext)

    const [imgSrc, setImgSrc] = useState(data.user.photoURL);
    console.log("data.user.photoURL", data.user.photoURL)
    console.log("imgSrc", imgSrc)

    useEffect(() => {
      setImgSrc(data.user.photoURL)
    }, [data.user.photoURL])
    
    const handleError = () => setImgSrc("https://upload.wikimedia.org/wikipedia/commons/c/ce/Example_image.png");

    // <img src={imgSrc} onError={handleError} />


    console.log(data)
    

    return (
        // {chat}
        <div className='container grid grid-rows-chatLayout h-screen'>
            {/* Chat Info */}
            <div className='text-white w-full p-4 bg-dcBlue 
            flex items-center justify-start gap-3 text-xl font-bold row-start-1 row-span-1'>
                <div className="flex gap-5 items-center">
                    {/* {Icons / profilename } */}
                    {data.user.photoURL ? (<img src={imgSrc} onError={handleError} alt="profile picture"
                        className='w-10 aspect-square object-cover rounded-lg' />) : <div>Click on a user to start chatting!</div>}
                    {data.user?.displayName}
                </div>
            </div>
            <Messages className="" />
            <Input className="" />
        </div>
    )
}

export default Chat