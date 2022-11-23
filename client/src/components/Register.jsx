import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../Firebase-config"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../Firebase-config'
import { useNavigate, Link } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa"
import { MdOutlineAddPhotoAlternate } from "react-icons/md"

const Register = () => {
    const [error, setError] = useState(false)
    const [passwordError, setPasswordError] = useState('') // Password validation
    const [registerFields, setRegisterFields] = useState('')
    const navigate = useNavigate()

    const handleRegisterChange = (event) => {
        const { name, value } = event.target

        // Password validation
        if (name === 'password' && value.length < 6) {
            setPasswordError('Password should be at least 6 characters.')
        } else {
            setPasswordError('')
        }
        setRegisterFields({
            ...registerFields,
            [name]: value
        })
    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault()
        const displayName = event.target[0].value
        const email = event.target[1].value
        const password = event.target[2].value
        const file = event.target[3].files[0]
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res.user.uid);
            // User signed up (created user)
            // Create a unique image name
            const date = new Date().getTime()
            const storageRef = ref(storage, `images/${res.user.uid}/${displayName + date}`);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            await uploadBytesResumable(storageRef, file).then(() => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        // Add a new document in collection "users" in firestore db
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: displayName,
                            email: email,
                            photoURL: downloadURL,
                            about: ""
                        });
                        // Add a new document in collection "userChats"
                        await setDoc(doc(db, "userChats", res.user.uid), {})
                        navigate('/chatapp/home')
                    } catch (error) {
                        setError(true)
                        console.log('unsuccessful. Error Message:', error.message)

                        // add a user to this db when this.user creates a chat with another user
                    }
                });
            })
        } catch (error) {
            setError(true)
            console.log('unsuccessful. Error Message:', error.message)}}


            // .then((userCredential) => {
            //     // Signed in 
            //     const user = userCredential.user;

            //     console.log(user)
            //     // ...
            // })
            // .catch((error) => {
            //     const errorCode = error.code;
            //     const errorMessage = error.message;
            //     console.log(error.message)
            //     // ..
            // });




            return (
                <section id="register">

                    {/* Flex container */}
                    <div className="flex flex-col gap-12 bg-dcBlue h-screen">
                        {/* Header */}
                        <div className="flex items-center gap-3 text-lightWhite text-3xl font-bold p-6 ">
                            <FaRocketchat />ChatApp
                        </div>
                        {/* Main login section */}
                        <div className="flex flex-col gap-6 justify-center items-center rounded-lg
                mx-3 p-6 bg-lightWhite filter shadow-2xl shadow-gray-500">
                            <div className="text-3xl font-black text-dcBlue">
                                Create an account
                                <div className="text-base font-normal text-center mt-1 text-dcBlue">
                                    Register
                                </div>
                            </div>
                            <form className="flex flex-col gap-6 w-60" onSubmit={handleRegisterSubmit}>
                                <input type="text" name="displayName" value={registerFields.displayName} onChange={handleRegisterChange} placeholder=" display name *"
                                    className="border-b p-2 mt-1 bg-lightWhite text-materialBlack" />
                                <input type="text" name="email" value={registerFields.email} onChange={handleRegisterChange} placeholder=" email *"
                                    className="border-b p-2 mt-1 bg-lightWhite text-materialBlack" />
                                    {error &&  
                                        <span className="text-xs p-0 text-red-500 mt-0">
                                        Email is already existed.
                                        </span>}
                                <input type="password" name="password" value={registerFields.password} onChange={handleRegisterChange} placeholder=" password *"
                                    className="border-b p-2 mt-1 bg-lightWhite text-materialBlack" />
                                {/* Password validation */}
                                {passwordError &&
                                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                        {passwordError}
                                    </span>}
                                {/* <input type="text" name="confirmPassword" value={registerFields.confirmPassword} onChange={handleRegisterChange} placeholder=" confirm password *"
                                className="border-b p-2 mt-1 bg-lightWhite text-materialBlack" /> */}
                                <input type="file" name="profilePic" id="file" className="hidden" />
                                <label htmlFor="file" className="text-dcBlue flex flex-row gap-3 items-center justify-center">
                                    <MdOutlineAddPhotoAlternate className="text-4xl" />
                                    <span className="translate-y-0.5">Add a profile picture</span>
                                </label>


                                {/* Create account button */}
                                <label className="flex flex-col">
                                    <input type="submit" value="CREATE ACCOUNT" className="flex rounded-md p-2 
                            justify-center transition-all bg-dcBlue text-lightWhite" />

                                    <div className="flex gap-1 justify-center mt-3">
                                        <Link to="/chatapp/login" className="underline text-dcBlue">Already have an account?</Link>
                                    </div>
                                </label>
                                {error && <span>Registration unsuccessful</span>}
                            </form>

                        </div>
                    </div>
                </section>
            )
        }

        export default Register