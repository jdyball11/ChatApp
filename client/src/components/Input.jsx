import React, { useContext, useState } from 'react'
import { ChatContext } from '../contexts/ChatContext'
import { MdSend } from "react-icons/md"
import { FaPlus } from "react-icons/fa"
import { AuthContext } from '../contexts/AuthContext'
import { arrayUnion, doc, updateDoc, Timestamp, serverTimestamp } from 'firebase/firestore'
import { db, storage } from '../Firebase-config'
import { v4 as uuidv4 } from 'uuid'
import { uploadBytesResumable } from 'firebase/storage'



const Input = () => {
    const [ text, setText ] = useState("")
    const [ img, setImg ] = useState(null)

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSend = async () => {
        if(img){
            // for storing the image
            const storageRef = ref(storage, uuidv4())
            const uploadTask = uploadBytesResumable(storageRef, img)
            uploadTask.on(                
                (error) => {
                    // Handle unsuccessful uploads
                    setError(true)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                // using uuidv4 to generate unique id for each message
                                id: uuidv4(),
                                text,
                                // set senderId to distinguish the sender and receiver
                                senderId:currentUser.uid,
                                date: Timestamp.now(),
                                // send the image as well when an image is attached
                                img: downloadURL
                            })
                        })
                    });
                }
            );

        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                // update element in an array: arrayUnion() automatically add a element to the messages array
                messages: arrayUnion({
                    // using uuidv4 to generate unique id for each message
                    id: uuidv4(),
                    text,
                    // set senderId to distinguish the sender and receiver
                    senderId:currentUser.uid,
                    date: Timestamp.now(),
                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()                        
        })

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()                        
        })

        setText("")
        setImg(null)
    }

    return (
        <div className='flex text-2xl items-center gap-3'>
            <input type="file" id="file" onChange={event=>setImg(event.target.files[0])}
            className="hidden" />
            <label htmlFor='file'><FaPlus /></label>
            
            {/* text field for message */}
            <input type="text" 
            placeholder={'Message to ' + data.user.displayName} 
            onChange={event=>setText(event.target.value)} value={text}/>
            {/* Send button */}
            <MdSend onClick={handleSend}/>
            
        </div>
    )
}

export default Input