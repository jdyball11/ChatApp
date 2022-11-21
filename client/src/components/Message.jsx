import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
  return (
    <div className='border-dcBlue'>{message}</div>
  )
}

export default Message