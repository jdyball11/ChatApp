import { useState } from "react"

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
            <div className="container mx-auto mt-20 flex flex-col gap-6 justify-center items-center">
                <div className="text-4xl font-bold">
                    Welcome back!
                </div>
                <div className="text-xl">
                    We're delightful to see you again!
                </div>
                <form className="flex flex-col gap-6 w-60">
                    <label htmlFor="username" className="flex flex-col">
                        <div>
                            Username
                            <span className="text-red-500"> *</span>
                        </div>
                        <input type="text" name="username" value={loginFields.username} onChange={handleLoginChange} placeholder=" username"
                            className="border-2 rounded-lg p-2 mt-1" />
                    </label>
                    <label htmlFor="password" className="flex flex-col">
                        <div>
                            Password
                            <span className="text-red-500"> *</span>
                        </div>
                        <input type="text" name="password" value={loginFields.password} onChange={handleLoginChange} placeholder=" password"
                            className="border-2 rounded-lg p-2 mt-1" />
                        <a href='' className="underline mt-1">Forgot your password?</a>
                    </label>

                    <label className="flex flex-col">
                        <input type="submit" value="LOGIN" className="flex border-2 rounded-lg p-2 justify-center transition-all hover:bg-white hover:text-black" />

                        <div className="flex gap-1 justify-start mt-1">
                            New to us? <a href='' className="underline">REGISTER</a>
                        </div>
                    </label>
                </form>

            </div>
        </section>
    )
}

export default Login