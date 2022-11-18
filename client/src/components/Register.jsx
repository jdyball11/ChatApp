const Register = () => {
    return (
        <section id="login">
            {/* Flex Container */}
            <div className="container flex flex-col gap-6 justify-center items-center">
                <div className="text-2xl">
                    Create an account
                </div>
                <form className="flex flex-col gap-3">
                    <label htmlFor="username">
                        Username: <br />
                        <input type="text" name="username" />
                    </label>
                    <label htmlFor="password">
                        Password: <br/>
                        <input type="text" name="password" />
                    </label>
                    <input type="submit" value="REGISTER" />
                </form>
                
            </div>
        </section>
    )
}

export default Register