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
        <div className='w-full h-screen'> 
            {/* Chat Info */}
              <div className='text-white h-20 w-full p-3 bg-dcBlue flex items-center justify-start gap-3 text-xl font-bold'> 
                <div className="flex gap-5 flex items-center">
                    {/* {Icons / profilename } */}
                    <img src={data.user.photoURL} alt="profile picture" className='w-10 aspect-square object-cover rounded-lg' />
                    {data.user?.displayName}

                </div>  
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat