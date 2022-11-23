import { useState, useEffect, useContext, useRef } from "react"
import { useNavigate, Link } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md"
import { FaRocketchat } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

import { updateProfile, signOut } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../Firebase-config"
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { AuthContext } from "../contexts/AuthContext";

// import Navbar from "./Navbar"

const EditProfile = () => {
    const [editFields, setEditFields] = useState({})
    const [error, setError] = useState(false)
    const [imageSelected, setImageSelected] = useState(false)
    const [chars, setChars] = useState(150)
    const currentUserColRef = useRef()
    const {currentUser, setCurrentUser} = useContext(AuthContext)
    
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () =>{
            if (currentUser !== null) {
                console.log("current login user from AuthContext: ", currentUser);
                let userDoc = doc(db, "users", currentUser?.uid)
                currentUserColRef.current = userDoc
                console.log("User Collection Ref: ", userDoc)
                const userDocSnap = await getDoc(userDoc)
                if (userDocSnap.exists()) {
                    console.log("userDocSnap  :", userDocSnap.data());
                }

                setEditFields({
                    photoURL: currentUser.photoURL,
                    displayName: currentUser.displayName,
                    about: userDocSnap.data().about
                })
            }
        }
        getUser()
    }, [currentUser]) // useEffect will run when currentUser changes or remount

    // handle change at form input
    const handleEditChange = (event) => {
        const { name, value } = event.target
        // check "about" characters length
        if (name === "about") {
            setChars(150 - value.length)
        }
        setEditFields({
            ...editFields,
            [name]: value
        })
    }

    // handle if an image is selected
    const handleSelectImage = (event) => {
        setImageSelected(true)
    }

    // handle cancel profile edit button
    const handleCancelEdit = () => {
        navigate('/chatapp/home')
    }

    // sign out button
    const handleClickSignOut = () => {
        signOut(auth)
        navigate('/chatapp/login')
    }

    // handle form submit
    const handleEditSubmit = async (event) => {
        event.preventDefault()
        const displayName = event.target[1].value
        const about = event.target[3].value
        let file
        // If no image select to upload
        if (!event.target[0].files[0]) {
            try {
                await updateProfile(currentUser, {
                    displayName,
                })
                console.log("Profile Updated");
                await updateDoc(currentUserColRef.current, {
                    "about": about,
                    "displayName": displayName,
                })
                console.log("Doc Updated");
                setError(false)
                navigate('/chatapp/home')
            } catch (error) {
                setError(true)
                console.log("Error message- submit with no image upload: ", error.message);
            }
        // if image selected to upload
        } else {
            file = event.target[0].files[0]
            console.log("Image file: ", event.target[0].files[0])
            try {
                const storageRef = ref(storage, `images/${currentUser.uid}/${displayName}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on(
                    (error) => {
                        setError(true)
                        console.log("Upload Task Error Message: ", error.message);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                            console.log('File available at', downloadURL);
                            await updateProfile(currentUser, {
                                displayName,
                                photoURL:downloadURL
                            })
                            console.log("Profile Updated");
                            await updateDoc(currentUserColRef.current, {
                                "about": about,
                                "displayName": displayName,
                                "photoURL": downloadURL
                            })
                            setCurrentUser({
                                ...currentUser,
                                displayName,
                                about,
                                photoURL: downloadURL
                            })
                            console.log("Doc Updated");
                        })
                        setError(false)
                        navigate('/chatapp/home')
                    }
                )
            } catch (error) {
                setError(true)
                console.log("Error Message: ", error.message);
            }
        }
    }

    return (
        <div className="flex flex-col gap-12 bg-dcBlue h-screen">
            {/* Navbar */}
            <div className="flex flex-row items-center justify-between gap-3 text-lightWhite font-bold p-4">
                <div className='flex gap-2 items-center font-bold text-3xl'>
                    <Link to="/chatapp/home"><FaRocketchat /></Link>
                </div>
                <div className='flex gap-2 items-center text-xl'>
                    <Link to="/chatapp/userprofile" className="flex items-center">
                        <img src={currentUser?.photoURL} alt="profile picture" className='w-9 h-9 object-cover rounded-full mr-2'/>
                        <span>{currentUser?.displayName}</span>
                    </Link>
                    <MdLogout onClick={handleClickSignOut}/>
                </div>
            </div>

            {/* Body/Content */}
            <div className="flex justify-center items-center">
            <div 
            className="flex flex-col gap-6 justify-center items-center rounded-lg mx-3 p-8 bg-lightWhite filter shadow-2xl shadow-gray-500 w-80">
                <div className="text-3xl font-black text-dcBlue">
                    Edit Profile
                    <div className="text-base font-normal text-center mt-1 text-dcBlue">
                        ...
                    </div>
                </div>

                <form className="flex flex-col gap-3 w-70" onSubmit={handleEditSubmit}>
                    <input 
                        type="file" id="file" className="hidden"
                        name="profilePic" 
                        onChange={handleSelectImage}
                    />
                    <label htmlFor="file" className={`text-sm flex flex-row gap-3 items-center justify-center ${imageSelected ? "text-blue-900" : "text-dcBlue"}`} >
                        <MdOutlineAddPhotoAlternate className="text-4xl" />
                        {/* <img src={editFields.photoURL} alt="" /> */}
                        {imageSelected ? "New Profile Picture is Ready to be Uploaded" : "Upload a New Profile Picture" }
                    </label>
                    
                    <input 
                        className="border-b p-2 mt-1 bg-lightWhite text-materialBlack"
                        type="text"
                        name="displayName" 
                        value={editFields.displayName} 
                        onChange={handleEditChange} 
                    />
                        
                    <input 
                        className="border-b p-2 mt-1 bg-lightWhite text-slate-400"
                        type="text" readOnly="readonly"
                        name="email" 
                        value={currentUser?.email}
                    />
                    
                    <textarea
                        className="border-b p-2 mt-1 bg-lightWhite text-materialBlack "
                        maxLength="150" rows="3" id="about" placeholder=" Tell us about yourself"
                        name="about" 
                        value={editFields.about}
                        onChange={handleEditChange}
                        ></textarea> 
                    <span className="text-slate-400 text-xs">{chars} Characters Remaining.</span>

                    {/* Submit edit profile button */}
                    <input 
                        className="flex rounded-md p-2 justify-center transition-all bg-dcBlue hover:bg-indigo-300 text-lightWhite font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
                        type="submit" 
                        value="EDIT PROFILE"  
                    />
                    
                    {/* Cancel editing button */}
                    <button
                        onClick={handleCancelEdit}
                        className="inline-flex w-full justify-center rounded-md bg-gray-300 p-2 text-base font-medium text-gray-500 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >CANCEL</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default EditProfile