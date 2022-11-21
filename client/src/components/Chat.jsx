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
        <div className='border-2'>
            {/* Chat Info */}
            This is the chat window*
            <div>
                <div className='text-dcBlue'>
                    {data.user?.displayName}
                </div>
                {/* <Messages /> */}
            </div>
            <Input />
        </div>
    )
}

export default Chat