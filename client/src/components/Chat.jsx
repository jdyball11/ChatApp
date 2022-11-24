import React, { useEffect, useState } from 'react'
import { ChatContext } from '../contexts/ChatContext'
import { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { FaRocketchat } from 'react-icons/fa'
import Navbar from './Navbar'
import Search from './Search'
import Contacts from './Contacts'
import DataUserProfile from './DataUserProfile'



const Chat = ({ handleSetSideBar }) => {
    // access the data:state in ChatContext
    const { data } = useContext(ChatContext)
    const [chatActive, setChatActive] = useState(true)
    const [sidebarShow, setSidebarShow] = useState(false)
    const [showUserDataModal, setShowUserDataModal] = useState(false)

    const [imgSrc, setImgSrc] = useState(data.user.photoURL);
    // console.log("data.user.photoURL", data.user.photoURL)
    // console.log("imgSrc", imgSrc)

    useEffect(() => {
        setImgSrc(data.user.photoURL)
    }, [data.user.photoURL])

    const handleError = () => setImgSrc("/xmark-solid.svg");
    const handleSidebarShow = (bool) => {
        setSidebarShow(bool)
    }

    const handleOnClose = () => {
        setShowUserDataModal(false)
    }    

    return (
        // {chat}
        <div className='container grid grid-rows-chatLayout h-screen transition-all sm:grid-cols-1'>
            <FaRocketchat className='absolute text-lightWhite text-3xl translate-x-4 translate-y-5 peer' onClick={()=>setSidebarShow(true)} />
            {/* mobile sidebar */}
            <div id="mobileSidebar" className={`h-screen ${!sidebarShow && 'hidden'} fixed w-[300px] bg-dcBlue 
            grid-rows-sideBarLayout transition-all sm:hidden`}>
                <Navbar handleSidebarShow={handleSidebarShow}/>
                <Search />
                <Contacts handleSidebarShow={handleSidebarShow} />
            </div>
            {/* Chat Info */}
            <div className='text-white p-4 bg-dcBlue flex items-center justify-start gap-3 text-xl font-bold col-starts-2 col-span-1 dark:bg-gray-900'>
                <div className="flex w-full gap-5 items-center justify-end">
                    {/* navicon */}
                    {/* <div>
                        <FaRocketchat className='sm:hidden' onClick={handleNavClick} />
                    </div> */}
                    {/* {Icons / profilename } */}
                    <div className='flex-row flex items-center gap-3'>
                        {data.user?.displayName}
                        {data.user.photoURL 
                            ? (<img src={imgSrc} onError={handleError} alt="profile picture" className='w-10 aspect-square object-cover rounded-lg' onClick={()=>{setShowUserDataModal(true)}} />) 
                            : <div>Click on a user to start chatting!</div>
                        }
                    </div>
                </div>
            </div>
            <Messages className="" />
            <Input className="" />
            <DataUserProfile onClose={handleOnClose} visible={showUserDataModal} data={data} />
        </div>
    )
}

export default Chat