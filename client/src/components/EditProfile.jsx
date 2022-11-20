// 1. Why Cannot edit user's display name? I tried to spread the user to userData
// 2. Why cannot upload image?
// 3. How to add new field to users collection?

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";

import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { AuthContext } from "../authContext";

// import { MdOutlineAddPhotoAlternate } from "react-icons/md"

import Navbar from "./Navbar"



const EditProfile = () => {
    const [editFields, setEditFields] = useState('')
    const [chars, setChars] = useState(200)
    const [userData, setUserData] = useState({})
    
    const navigate = useNavigate()
    
    const {user} = useContext(AuthContext)
    // useEffect(() => {
    //     const auth = getAuth()
    //     const user = auth.currentUser
    //     const userData = {...user}
    //     if (user !== null) {
    //         // // The user object has basic properties such as display name, email, etc.
    //         // const displayName = user.displayName;
    //         // const email = user.email;
    //         // const photoURL = user.photoURL;
    //         setUserData(...user)
    //     }
    // }, [user])
    console.log(user.displayName)
    console.log(user);
    // console.log(userData);

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
                            <img src={userData.photoURL} alt="" />
                            <span className="translate-y-0.5">Upload a profile picture</span>
                        </label>
                        
                        <input 
                            className="border-b p-2 mt-1 bg-lightWhite text-materialBlack"
                            type="text"
                            name="displayName" 
                            value={displayName} 
                            onChange={handleEditChange} 
                        />
                        
                        <input 
                            className="border-b p-2 mt-1 bg-lightWhite text-materialBlack"
                            type="text" readOnly="readonly"
                            name="email" 
                            value={userData.email}
                        />
                        
                        <textarea
                            className="border-b p-2 mt-1 bg-lightWhite text-materialBlack"
                            maxLength="200" rows="4" id="about" placeholder=" Tell us about yourself"
                            name="about" 
                            value={userData.about}
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


// ===========================================================================================
// // only 4 fields so far:
// // - Preferred name
// // - Email address
// // - About
// // - Profile picture

// // if have 2 models, user & profile, then all user here needs to be changed to profile *
// // has to link these 2 models together.
// // suggest only have 1 model, since this is simple form, unless chat is complicated.
// // but 2 models, how to link the loggedin-user with the user's profile model...?

// import { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // user pass from Login
// const EditProfile = (user) => {
//     const [userData, setUserData] = useState(null) // to prefill info, possible
//     const [chars, setChars] = useState(200) // to calculate remaining char at About

//     // const navigate = useNavigate()

//     useEffect(()=> {
//         if (user) { // *
//             setUserData({...user}) // *
//             // setChars({...user}.about.length) // *
//         }
//         // when refresh, will get loggedin user info and store it in above states.
//     }, [user]) // ? if links 2 models

//     const handleChange = (event) => {
//         const {name, value} = event.target
        
//         // handle characters remaining
//         if (name === "about") {
//             // setChars(200 - value.length)
//         }

//         // Set whatever user enter as userData, so it will store in userData
//         // After user created account, and want to come back to edit, userData will have the info
//         // because useEffect will not kick in until user change or refresh.
//         setUserData({
//             ...userData,
//             [name]: value
//         })
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault()
//         const formData = new FormData(event.target)
//         // url needs to be changed to our backend, profle model if 2 models
//         const res = await fetch (`/v1/profiles/${user._id}`, {
//             method: "PUT",
//             body: formData
//         })
//         const data = await res.json()
//         setUser(data) // * setProfile if profile model, needs to link to user model
//         // navigate(/* redirect user to where? */)
//     }

//     return (
//         <>
//             {/* user?.preferredName or userData?.preferredName? userData might not work as null (initial state) */}
//             <h2>{user?.preferredName ? "Edit Profile" : "Create An Account!"}</h2>
//             {/* conditional rendering fpr <p> too */}
//             <p>Tell us more about you</p>
//             <form>
//                 <label htmlFor="preferredName">Preferred Name:</label>
//                 <input 
//                     type="text" placeholder="Preferred Name" id="preferredName" required
//                     name="preferredName"
//                     // value={userData.preferredName}
//                     // onChange={handleChange}
//                 />

//                 <br />

//                 <label htmlFor="email">Email Address:</label>
//                 <input 
//                     type="email" placeholder="Email Address" id="email" required
//                     name="email"
//                     // value={userData.email}
//                     // onChange={handleChange}
//                 />

//                 <br />

//                 <label htmlFor="about">About:</label>
//                 <input 
//                     type="text" placeholder="About you" id="about" required
//                     name="about"
//                     // value={userData.about}
//                     // onChange={handleChange}
//                 />
//                 {/* this needs to be part of the form as display msg */}
//                 <p>{chars} Characters Remaining.</p>

//                 <br />

//                 <label htmlFor="img">Profile Picture</label>
//                 <input 
//                     type="file" id="img" required
//                     name="img"
//                 />

//                 <button type="submit">Submit</button>
//             </form>
//         </>
//     )
// }

// export default EditProfile