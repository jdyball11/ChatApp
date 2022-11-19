import { useState } from "react"
import { FaRocketchat } from "react-icons/fa"

const Login = () => {
    const initialState = {
        username: '',
        password: ''
    }

    const [loginFields, setLoginFields] = useState(initialState)

    const handleLoginChange = (event) => {
        console.log(event.target)
        const { name, value } = event.target
        setLoginFields({
            ...loginFields,
            [name]: value
        })
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault()
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
                mx-3 p-6 bg-lightWhite">
                    <div className="text-3xl font-black text-dcBlue">
                        Welcome Back!
                    </div>
                    <form className="flex flex-col gap-6 w-60">
                        <label htmlFor="username" className="flex flex-col">
                            <div className="text-dcBlue">
                                Username
                                <span className="text-red-500" > *</span>
                            </div>
                            <input type="text" name="username" value={loginFields.username} onChange={handleLoginChange} placeholder=" username"
                                className="border-2 rounded-lg p-2 mt-1 bg-lightWhite text-materialBlack" />
                        </label>
                        <label htmlFor="password" className="flex flex-col">
                            <div className="text-dcBlue">
                                Password
                                <span className="text-red-500"> *</span>
                            </div>
                            <input type="text" name="password" value={loginFields.password} onChange={handleLoginChange} placeholder=" password"
                                className="border-2 rounded-lg p-2 mt-1 bg-lightWhite text-materialBlack" />
                        </label>
                        {/* Create account button */}
                        <label className="flex flex-col">
                            <input type="submit" value="LOGIN" className="flex p-2 rounded-md 
                            justify-center transition-all bg-dcBlue text-[#fafafa] hover:bg-white hover:text-black" />
                            <div className="flex gap-1 mt-2 justify-center text-gray-500">
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