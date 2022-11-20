import { useState } from "react"
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
                    <form className="flex flex-col gap-6 w-60">
                        <label htmlFor="username" className="flex flex-col">
                            {/* <div className="text-dcBlue">
                                Username
                                <span className="text-red-500" > *</span>
                            </div> */}
                            <input type="text" name="username" value={registerFields.username} onChange={handleRegisterChange} placeholder=" username *"
                                className="border-b p-2 mt-1 bg-lightWhite text-materialBlack" />
                        </label>
                        <label htmlFor="password" className="flex flex-col">
                            {/* <div className="text-dcBlue">
                                Password
                                <span className="text-red-500"> *</span>
                            </div> */}
                            <input type="text" name="password" value={registerFields.password} onChange={handleRegisterChange} placeholder=" password *"
                                className="border-b p-2 mt-1 bg-lightWhite text-materialBlack"/>
                            <input type="text" name="confirmPassword" value={registerFields.confirmPassword} onChange={handleRegisterChange} placeholder=" confirm password *"
                                className="border-b p-2 mt-1 bg-lightWhite text-materialBlack" />
                        </label>
                        {/* Create account button */}
                        <label className="flex flex-col">
                            <input type="submit" value="CREATE ACCOUNT" className="flex rounded-md p-2 
                            justify-center transition-all bg-dcBlue text-lightWhite hover:bg-white hover:text-black" />

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