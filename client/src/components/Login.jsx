import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase-config"
import { getAuth } from "firebase/auth"
import { FaRocketchat } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const initialState = {
        username: '',
        password: ''
    }

    const [loginFields, setLoginFields] = useState(initialState)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleLoginChange = (event) => {
        console.log(event.target)
        const { name, value } = event.target
        setLoginFields({
            ...loginFields,
            [name]: value
        })
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        const email = event.target[0].value
        const password = event.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            // User logged in
            let user = getAuth().currentUser;

            // navigate('/chatapp/home')
                

        } catch (error) {
            setError(true)
            console.log('Sign In Error:', error.message)
        }


    }
    


    return (
        <section id='login'>
            {/* Flex container */}
            <div className="flex flex-col gap-12 bg-dcBlue h-screen">
                {/* Header */}
                <div className="flex items-center gap-3 text-lightWhite text-3xl font-bold p-6 ">
                    <FaRocketchat />ChatApp
                </div>
                {/* Main login section */}
                <div className="flex flex-col gap-6 justify-center items-center rounded-lg
                mx-3 p-6 bg-lightWhite filter shadow-md shadow-gray-500">
                    <div className="text-3xl font-black text-dcBlue">
                        Welcome Back!
                        <div className="text-base font-normal text-center mt-1 text-dcBlue">
                            Login
                        </div>
                    </div>

                    <form className="flex flex-col gap-6 w-60" onSubmit={handleLoginSubmit}>

                        <input type="text" name="username" value={loginFields.username} onChange={handleLoginChange} placeholder=" username *"
                            className="border-b p-2 bg-lightWhite text-materialBlack" />


                        <input type="password" name="password" value={loginFields.password} onChange={handleLoginChange} placeholder=" password *"
                            className="border-b p-2 bg-lightWhite text-materialBlack" />

                        {/* Create account button */}
                        <label className="flex flex-col mt-3">
                            <input type="submit" value="LOGIN" className="flex p-2 rounded-md 
                            justify-center transition-all bg-dcBlue text-lightWhite hover:bg-white hover:text-black" />
                            <div className="flex gap-1 mt-3 justify-center text-gray-500">
                                New to us? <a href='' className="underline text-dcBlue"> Register</a>
                            </div>

                        </label>

                    </form>

                </div>
            </div>

        </section>
    )
}

export default Login