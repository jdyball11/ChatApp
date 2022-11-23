import React from 'react'
import { ChatContext } from '../contexts/ChatContext'
import { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'


const Chat = () => {
    // access the data:state in ChatContext
    const { data } = useContext(ChatContext)
    console.log(data)
    return (
        // {chat}
        <div className='container grid grid-rows-auto h-screen'>
            {/* Chat Info */}
            <div className='text-white w-full p-4 bg-dcBlue 
            flex items-center justify-start gap-3 text-xl font-bold row-start-1 row-span-1'>
                <div className="flex gap-5 items-center">
                    {/* {Icons / profilename } */}
                    <img src={data.user.photoURL} alt="profile picture" className='w-10 aspect-square object-cover rounded-lg' />
                    {data.user?.displayName}
                </div>
            </div>
            <Messages className="" />
            <Input className=""/>
        </div>
    )
}

export default Chat