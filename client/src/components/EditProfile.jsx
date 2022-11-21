// 1. Why Cannot edit user's display name? I tried to spread the user to userData
// 3. How to add new field to users collection?

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";

import { updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from "../Firebase-config"

import { AuthContext } from "../authContext";


// import { MdOutlineAddPhotoAlternate } from "react-icons/md"

import Navbar from "./Navbar"

const EditProfile = () => {
    const [editFields, setEditFields] = useState('')
    const [chars, setChars] = useState(200)
    const [userData, setUserData] = useState({})
    
    const navigate = useNavigate()
    
    const currentUser = useContext(AuthContext)
    // useEffect(() => {
    //     const auth = getAuth()
    //     const user = auth.currentUser
    //     const userData = {...user}
    //     if (user !== null) {
    //         // The user object has basic properties such as display name, email, etc.
    //         const displayName = user.displayName;
    //         const email = user.email;
    //         const photoURL = user.photoURL;
    //         setUserData(...user)
    //     }
    // }, [user])

    // console.log(user.displayName)
    console.log(currentUser);


    const handleEditChange = (event) => {
        const { name, value } = event.target

        // console.log(event.target[3])
        if (name === "about") {
            setChars(200 - value.length)
        }
        setEditFields({
            ...editFields,
            [name]: value
        })
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault()
        const displayName = event.target[1].value
        const about = event.target[3].value
        console.log(event.target[0]); //profile Pic
        console.log(event.target[1]); // displayName
        console.log(event.target[2]); // email
        console.log(event.target[3]); // about, how to get the value?
        try{
            const storage = getStorage();
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
                    <form className="flex flex-col gap-6 w-60" onSubmit={handleEditSubmit}>

                        <input 
                            type="file" id="file" className="hidden"
                            name="profilePic" 
                        />
                        <label htmlFor="file" className="text-dcBlue flex flex-row gap-3 items-center justify-center">
                            {/* <MdOutlineAddPhotoAlternate className="text-4xl" /> */}
                            {/* <img src={currentUser.photoURL} alt="" /> */}
                            <span className="translate-y-0.5">Upload a profile picture</span>
                        </label>
                        
                        <input 
                            className="border-b p-2 mt-1 bg-lightWhite text-materialBlack"
                            type="text"
                            name="displayName" 
                            value={currentUser?.displayName} 
                            onChange={handleEditChange} 
                        />
                        
                        <input 
                            className="border-b p-2 mt-1 bg-lightWhite text-materialBlack"
                            type="text" readOnly="readonly"
                            name="email" 
                            value={currentUser?.email}
                        />
                        
                        <textarea
                            className="border-b p-2 mt-1 bg-lightWhite text-materialBlack"
                            maxLength="200" rows="4" id="about" placeholder=" Tell us about yourself"
                            name="about" 
                            value={currentUser?.about}
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
