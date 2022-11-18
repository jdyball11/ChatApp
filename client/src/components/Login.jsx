const Login = () => {
    return (
        <div className="container mt-20 flex flex-col gap-6 justify-center items-center">
            <div className="text-2xl">
                Welcome back!
            </div>
            <form className="flex flex-col gap-3">
                <label for="username">
                    Username: <br />
                    <input type="text" name="username" />
                </label>
                <label for="password">
                    Password: <br />
                    <input type="text" name="password" />
                </label>
                <input type="submit" value="LOGIN" />
            </form>
            <div>
                New to us? <a href='' className="underline">REGISTER</a>
            </div>
        </div>
    )
}

export default Login