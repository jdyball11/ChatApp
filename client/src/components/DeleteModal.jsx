import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"

import { doc, getDoc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { db, auth, storage } from "../Firebase-config"

import { AuthContext } from "../contexts/AuthContext";

const DeleteModal = ({visible, onClose}) => {
    const [error, setError] = useState("")
    const [needAuth, setNeedAuth] = useState(false)
    const navigate = useNavigate()
    
    const user = useContext(AuthContext).currentUser
    // const photoRef = ref(storage, `images/${user.uid}`) // image name that include uid? - extra, delete later?

    if (!visible){
        return null
    }

    // added id in the container and event here to prevent event bubbling
    const handleOnClose = (event) => {
        if (event.target.id === "modal-container") {
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
        return result
    }

    const handleAuthConfirmSubmit = (event) => {
        event.preventDefault()
        console.log();
        const reauthenticate = async () => {
            try {
                const auth = getAuth();
                // console.log("try block - auth: ", auth)
                const user = auth.currentUser;
                // console.log("try block - currentuser: ", user)

                const email = user.email
                
                const credential = promptForCredentials(
                    email,
                    event.target.authPassword.value
                );
                //console.log("try block - credential", credential)
                await reauthenticateWithCredential(user, credential);
                console.log("successfully reauthenticated");
                setNeedAuth(false)
                return true
            } catch (e) {
                console.log("Credential: ",e);
                setNeedAuth(true)
                return null
            }
        }
        reauthenticate()
    }

    const handleDeleteAccount = async () => {
        // grab the user.uid and check against chats' id, if deactivate then isActive= false
        const querySnapshot = await getDocs(collection(db, "chats"));
        console.log(querySnapshot)
        querySnapshot.forEach( async (doc) => {
            if (doc.id.includes(user.uid)) {
                let docRef = doc(db, "chats", doc.id)
                await updateDoc(docRef, {
                    isActive: false
                })
                console.log(doc.data().isActive)
            }
        });

        try {
            // await Promise.all([deleteObject(photoRef), deleteDoc(doc(db, "users", user.uid)), deleteUser(user)])
            await deleteDoc(doc(db, "users", user.uid)).then(() => { 
            console.log("Doc deleted");
            }).catch((error) => {
                console.log(error)
            })

            await deleteFolder()

            await deleteUser(user).then(() => {
                console.log("User & doc deleted");
                navigate('/chatapp/register')
            }).catch((error) => {
                console.log(error);
            });
            setError("")
            navigate('/chatapp/register')    
        } catch (error) {
            setNeedAuth(true)
            console.log("Delete Account Error: ", error.message)
            console.log(typeof(error.message))
            setError(String(error.message))
        }
    }

    return (
        <>
            <div 
            id="modal-container"
            className="text-materialBlack fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
            onClick={handleOnClose}>

                <div className="inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">

                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>
                        
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Deactivate account</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                                            {error && <p className="text-sm text-red-500">Account cannot be deleted due to {error.message}</p>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* Styling TODO */}
                            {needAuth && 
                                <form onSubmit={handleAuthConfirmSubmit}>
                                    <label htmlFor="auth-password">Please enter your password to confirm:</label>
                                    <input 
                                        type="password" 
                                        id="auth-password"
                                        name="authPassword"
                                         />
                                    <button type="submit">Confirm</button>
                                </form>
                            }
                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button 
                                type="button" onClick={handleDeleteAccount} 
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                >Deactivate</button>
                                
                                <button 
                                type="button" onClick={onClose} 
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DeleteModal