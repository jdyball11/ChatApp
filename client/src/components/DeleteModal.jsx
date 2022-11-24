import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"

import { doc, getDocs, updateDoc, deleteDoc, collection, query, where } from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { db, auth, storage } from "../Firebase-config"

import { AuthContext } from "../contexts/AuthContext";

const DeleteModal = ({visible, onClose}) => {
    const [error, setError] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const navigate = useNavigate()
    
    const user = useContext(AuthContext).currentUser

    // for Modal
    if (!visible){
        return null
    }

    // added id in the container and event here to prevent event bubbling
    const handleOnClose = (event) => {
        if (event.target.id === "modal-container") {
            setError(false)
            setLoginError(false)
            onClose()
        }
    }
    // Delete folder in Storage
    async function deleteFolder() {
        const folderRef = ref(storage, `images/${user.uid}`)
        const fileList = await listAll(folderRef)
        const promises = []
        for(let item of fileList.items) {
            promises.push(deleteObject(item))
        }
        const result = await Promise.all(promises)
        console.log("deleted profile pic");
        return result
    }

    // Update isActive on chats & DELETE USER!
    const handleDeleteAccount = async (event) => {
        event.preventDefault()

        const auth = getAuth();
        const user1 = auth.currentUser;

        // Make chats doc isActive = true --------------
        const chatsIdList = []
        const updateChatsIsActive = async () => {
            const q = query(collection(db, "chats"), where("participants", "array-contains", user1.uid));
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                chatsIdList.push(doc.id)
            });

            console.log(chatsIdList)
            chatsIdList.forEach(async (chatId) => {
                let chatDocRef = doc(db, "chats", chatId)
                await updateDoc(chatDocRef, {
                    isActive: false
                })
            })
        };
        updateChatsIsActive()
        // END - Make chats doc isActive = true --------------

        const email = event.target[0].value
        const password = event.target[1].value

        const credential = EmailAuthProvider.credential(email, password);
        try {
            await reauthenticateWithCredential(user1, credential)
            console.log("Reauthentication successfully")    
            setLoginError(false)
            await deleteDoc(doc(db, "users", user.uid))
            console.log("Doc deleted");
            await deleteFolder()
            await deleteUser(user)
            console.log("User deleted");
            setError(false)
            navigate('/chatapp/register')   
        } catch (error) {
            console.log("Delete Account Error: ", error.message)
            setError(true)
            setLoginError(true)
            console.log(typeof(error.message))
            setError(String(error.message))
        }
    }

    return (
        <div 
        id="modal-container"
        className="text-materialBlack fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        onClick={handleOnClose}>

            <div className="inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg dark:bg-gray-800">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
                            <div className="sm:flex sm:items-start">

                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 dark:bg-red-600">
                                    <svg className="h-6 w-6 text-red-600 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                    
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white" id="modal-title">Deactivate account</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-300">Please enter your login information to confirm deactivation:</p>
                                        <form onSubmit={handleDeleteAccount}>
                                        <input 
                                            type="text" name="email" placeholder=" email address *"
                                            className="border-b p-2 bg-lightWhite text-materialBlack" />
                                        
                                        <input 
                                            type="password" name="password" placeholder=" password *"
                                            className="border-b p-2 bg-lightWhite text-materialBlack" />
                                        {loginError && <p className="text-red-500">{error.slice(10, error.length)}</p>}
                                        
                                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button 
                                            type="submit" 
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                            >Deactivate</button>
                                            
                                            <button 
                                            type="button" onClick={onClose} id="modal-container"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            >Cancel</button>
                                        </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal