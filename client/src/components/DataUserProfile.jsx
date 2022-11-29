import { FaRocketchat } from 'react-icons/fa'

const DataUserProfileModal = ({visible, onClose, data}) => {

    if (!visible) return null;

    const handleOnClose = (event) => {
        if (event.target.id === "modal-container"){
        onClose()
        }
    }

    const handleClickSignOut = () => {
        signOut(auth)
        navigate('/')
    }

    return (
        <div 
        onClick={handleOnClose}
        id="modal-container"
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            
                    <div 
                        className="flex flex-col gap-6 justify-center items-center rounded-lg mx-3 p-6 bg-lightWhite filter shadow-2xl shadow-gray-500 w-fit dark:text-white dark:bg-gray-900 dark:shadow-lightRounded">
                        <div className="flex justify-between relative">
                            <img src={data.user?.photoURL} alt={data.user?.displayName} className="w-80 h-80 rounded-full m-auto object-cover dark:border-slate-300" />
                        </div>
                        <div className="flex justify-center items-center text-dcBlue text-md font-bold mt-2">
                            <FaRocketchat />
                            <p className="ml-1">Chatting with <em>{data.user?.displayName}</em></p>
                            {/* <p>Email Address: {data.user?.email}</p>
                            <p>About: {data.user?.about}</p> */}
                        </div>
                    </div>
        </div>
    )
}

export default DataUserProfileModal