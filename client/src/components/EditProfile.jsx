
// 3. How to add new field to users collection?

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";

import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../Firebase-config"

import { AuthContext } from "../AuthContext";

// import { MdOutlineAddPhotoAlternate } from "react-icons/md"

import Navbar from "./Navbar"

const EditProfile = () => {
    const [editFields, setEditFields] = useState({})
    const [chars, setChars] = useState(150)
    
    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext) // get logined-in user

    useEffect(() => {
        if (currentUser !== null) {
            console.log(currentUser);
            setEditFields({
                photoURL: currentUser.photoURL,
                displayName: currentUser.displayName,
                about: currentUser.about
            })
        }
    }, [currentUser]) // useEffect will run when currentUser changes or remount


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

    const handleEditSubmit = async (event) => {
        event.preventDefault()
        const file = event.target[0].files[0]
        const displayName = event.target[1].value
        console.log(displayName);
        const about = event.target[3].value
        console.log(about)
        // console.log(event.target[0]); //profile Pic
        // console.log(event.target[1]); // displayName
        // console.log(event.target[2]); // email
        // console.log(event.target[3]); // about, how to get the value?
        try{
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        console.log('File available at', downloadURL);
                        await updateProfile(auth.currentUser, {
                            displayName,
                            about,
                            photoURL:downloadURL
                        })
                    });
                }
            )
        } catch(error) {
            console.log(error)
        }
        navigate('/chatapp/home')
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
                        <p className="translate-y-0.5 text-dcBlue text-sm text-center">Upload a profile picture</p>
                        <label htmlFor="file" className="text-dcBlue flex flex-row gap-3 items-center justify-center">
                            {/* <MdOutlineAddPhotoAlternate className="text-4xl" /> */}
                            <img src={editFields.photoURL} alt="" />
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

                </div>
        </div>
    )
}

export default EditProfile
