import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    return (
        // message owner
        <div className='border-dcBlue'>
            {/* message info */}
            <div>
                <img src={message.senderId === currentUser.uid 
                ? currentUser.photoURL 
                : data.user.photoURL} alt="profile picture"/>
                <span>Just now</span>
            </div>
            <div>
                <p>{message.text}</p>
                {message.img && <img src={message.img} />}
            </div>
        </div>
    )
}

export default Message