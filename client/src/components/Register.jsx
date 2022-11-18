import { useState } from "react"


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
            {/* Flex Container */}
            <div className="container mx-auto flex flex-col mt-20 gap-6 justify-center items-center">
                <div className="text-4xl font-bold">
                    Create an account
                </div>
                <div className="text-xl">
                    Can't wait for you to join us!
                </div>
                <form className="flex flex-col gap-6 w-60">
                    <label htmlFor="username" className="flex flex-col">
                        <div>
                            Username
                            <span className="text-red-500"> *</span>
                        </div>
                        <input type="text" name="username" value={registerFields.username} onChange={handleRegisterChange}
                            placeholder=" new username" className="border-2 rounded-lg p-2 mt-1" />
                    </label>
                    <label htmlFor="password" className="flex flex-col">
                        <div>
                            Password
                            <span className="text-red-500"> *</span>
                        </div>
                        <input type="text" name="password" value={registerFields.password} onChange={handleRegisterChange}
                            placeholder=" new password" className="border-2 rounded-lg p-2 mt-1" />
                        <input type="text" name="confirmPassword" value={registerFields.confirmPassword} onChange={handleRegisterChange}
                            placeholder=" confirm password" className="border-2 rounded-lg p-2 mt-1" />
                    </label>
                    <label className="flex flex-col">
                    <input type="submit" value="REGISTER" className="border-2 rounded-lg p-2 align-middle transition-all hover:bg-white hover:text-black" />
                    <a className="mt-1 underline">
                        Already have an account?
                    </a>
                    </label>
                </form>

            </div>
        </section>
    )
}

export default Register