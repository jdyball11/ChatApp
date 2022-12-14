import { useState } from "react"
import { signInWithEmailAndPassword, browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "../Firebase-config"
import { getAuth } from "firebase/auth"
import { FaRocketchat } from "react-icons/fa"
import { useNavigate, Link } from "react-router-dom"
import Switcher from "./Switcher"

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
        // User logged in
        setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setError(false)
                    navigate('/chatapp/home')
                })
                .catch((error) => {
                    setError(true)
                    console.log('Sign In Error:', error.message)
                })

        })
    }



    return (
        <section id='login'>
            {/* Flex container */}
            <div className="flex flex-col gap-12 bg-dcBlue h-screen dark:bg-gray-900">
                {/* Header */}
                <div className="flex items-center gap-3 text-lightWhite text-3xl font-bold p-6 ">
                    <FaRocketchat />ChatApp
                    <Switcher />
                </div>

                {/* Main login section */}
                <div className="flex flex-col gap-6 justify-center items-center rounded-lg
                mx-3 p-6 bg-lightWhite filter shadow-md shadow-gray-500 text-dcBlue dark:text-white dark:bg-gray-900 dark:shadow-darkRounded">
                    <div className="text-3xl font-black">
                        Welcome Back!
                        <div className="text-base font-normal text-center mt-1 text-dcBlue">
                            Login
                        </div>
                    </div>

                    <form className="flex flex-col gap-6 w-60" onSubmit={handleLoginSubmit}>

                        <input type="text" name="username" value={loginFields.username} onChange={handleLoginChange} placeholder=" email address *"
                            className="border-b p-2 bg-lightWhite text-materialBlack" />


                        <input type="password" name="password" value={loginFields.password} onChange={handleLoginChange} placeholder=" password *"
                            className="border-b p-2 bg-lightWhite text-materialBlack" />

                        {error && <span className="text-xs p-0 text-red-500 mt-0">Incorrect email address or password.</span>}

                        {/* Create account button */}
                        <label className="flex flex-col mt-3">
                            <input type="submit" value="LOGIN" className="flex p-2 rounded-md 
                            justify-center transition-all bg-dcBlue text-lightWhite hover:scale-110" />


                        </label>
                        <div className="flex gap-1 justify-center text-gray-500 dark:text-white">
                            New to us? <Link to="/chatapp/register" className="underline text-dcBlue">Register</Link>
                        </div>

                    </form>

                </div>
            </div>

        </section>
    )
}

export default Login