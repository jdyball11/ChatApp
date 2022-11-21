// Problem is when the user edited the profile but did not upload new pic. 
// that's when the image will not work

import { useState, useEffect, useContext, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md"

import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../Firebase-config"
import { doc, getDoc, updateDoc } from "firebase/firestore";


import { AuthContext } from "../contexts/AuthContext";

// import { MdOutlineAddPhotoAlternate } from "react-icons/md"


import Navbar from "./Navbar"

const EditProfile = () => {
    const [editFields, setEditFields] = useState({})
    const [error, setError] = useState(false)
    const [chars, setChars] = useState(150)
    const currentUserColRef = useRef()
    
    const navigate = useNavigate()
    const currentUserProfile = auth.currentUser // get logined-in user

    useEffect(() => {
        const getUser = async () =>{
            if (currentUserProfile !== null) {
                console.log("current login user from Auth: ", currentUserProfile);
                let userDoc = doc(db, "users", currentUserProfile.uid)
                currentUserColRef.current = userDoc
                console.log("User Collection Ref: ", userDoc)
                const userDocSnap = await getDoc(userDoc)
                if (userDocSnap.exists()) {
                    console.log("userDocSnap  :", userDocSnap.data());
                }

                setEditFields({
                    photoURL: currentUserProfile.photoURL,
                    displayName: currentUserProfile.displayName,
                    about: userDocSnap.data().about
                })
            }
        }
        getUser()
    }, [currentUserProfile]) // useEffect will run when currentUser changes or remount

    const handleEditChange = (event) => {
        const { name, value } = event.target

        // console.log(event.target[3])
        if (name === "about") {
            setChars(150 - value.length)
        }
        setEditFields({
            ...editFields,
            [name]: value
        })
    }

    const handleCancelEdit = () => {
        navigate('/chatapp/home')
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault()
        console.log("editFields photo URL: ", editFields.photoURL);
        let file
        if (!event.target[0].files[0]) {
            file = editFields.photoURL
        } else {
            file = event.target[0].files[0]
        }
        console.log("Image file: ", event.target[0].files[0])
        console.log(file);
        const displayName = event.target[1].value
        const about = event.target[3].value
        try {
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setError(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        await updateProfile(currentUserProfile, {
                            displayName,
                            photoURL:downloadURL
                        })
                        console.log("Profile Updated");
                        await updateDoc(currentUserColRef.current, {
                            "about": about,
                            "displayName": displayName,
                            "photoURL": downloadURL
                        })
                        console.log("Doc Updated");
                    })
                    navigate('/chatapp/home')
                }
            )
        } catch (error) {
            setError(true)
            console.log("Error Message: ", error.message);
        }
    }

    return (
        <div className="flex flex-col gap-12 bg-dcBlue h-screen">
            <Navbar />
            <div className="flex flex-col gap-6 justify-center items-center rounded-lg
                mx-3 p-6 bg-lightWhite filter shadow-2xl shadow-gray-500">
                    <div className="text-3xl font-black text-dcBlue">
                        Edit Profile
                        <div className="text-base font-normal text-center mt-1 text-dcBlue">
                            ...
                        </div>
                    </div>

                    {/* onSubmit={handleEditProfileSubmit} */}
                    <form className="flex flex-col gap-3 w-60" onSubmit={handleEditSubmit}>

                        <input 
                            type="file" id="file" className="hidden"
                            name="profilePic" 
                        />
                        <label htmlFor="file" className="text-dcBlue flex flex-row gap-3 items-center justify-center">
                            <MdOutlineAddPhotoAlternate className="text-4xl" />
                            {/* <img src={editFields.photoURL} alt="" /> */}
                            Upload a profile picture
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
                            value={currentUserProfile?.email}
                        />
                        
                        <textarea
                            className="border-b p-2 mt-1 bg-lightWhite text-materialBlack "
                            maxLength="150" rows="3" id="about" placeholder=" Tell us about yourself"
                            name="about" 
                            value={editFields.about}
                            onChange={handleEditChange}
                            >
                        </textarea> 
                        <span className="text-slate-400 text-xs">{chars} Characters Remaining</span>

                        {/* Submit edit profile button */}
                        <input 
                            className="flex rounded-md p-2 justify-center transition-all bg-dcBlue text-lightWhite"
                            type="submit" 
                            value="EDIT PROFILE"  
                        />
                    </form>
                    <button
                        className="flex rounded-md p-2 justify-center transition-all bg-dcBlue text-lightWhite"
                        onClick={handleCancelEdit}
                    >
                        CANCEL</button>
                </div>
        </div>
    )
}

export default EditProfile