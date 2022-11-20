import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase-config"
import { FaRocketchat } from "react-icons/fa"

const Register = () => {
    const [registerFields, setRegisterFields] = useState('')

    const handleRegisterChange = (event) => {
        const { name, value } = event.target
        setRegisterFields({
            ...registerFields,
            [name]: value
        })
        console.log(registerFields)
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault()
        const displayName = event.target[0].value
        const email = event.target[1].value
        const password = event.target[2].value


        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    

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
                        <input type="password" name="password" value={registerFields.password} onChange={handleRegisterChange} placeholder=" password *"
                            className="border-b p-2 mt-1 bg-lightWhite text-materialBlack" />
                        {/* <input type="text" name="confirmPassword" value={registerFields.confirmPassword} onChange={handleRegisterChange} placeholder=" confirm password *"
                                className="border-b p-2 mt-1 bg-lightWhite text-materialBlack" /> */}

                        {/* Create account button */}
                        <label className="flex flex-col">
                            <input type="submit" value="CREATE ACCOUNT" className="flex rounded-md p-2 
                            justify-center transition-all bg-dcBlue text-lightWhite" />

                            <div className="flex gap-1 justify-center mt-3">
                                <a href='' className="underline text-dcBlue">Already have an account?</a>
                            </div>
                        </label>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default Register