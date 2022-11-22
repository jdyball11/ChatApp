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
        <div className='flex'>
            {/* Chat Info */}
            <div>
                <div className='text-white p-3 bg-dcBlue flex items-center justify-start gap-3 text-xl font-bold'>
                    <img src={data.user.photoURL} alt="profile picture" className='w-10 aspect-square object-cover rounded-lg' />
                    {data.user?.displayName}

                </div>
                <Messages />
                <Input />
            </div>
        </div>
    )
}

export default Chat