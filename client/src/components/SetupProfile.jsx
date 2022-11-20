// only 4 fields so far:
// - Preferred name
// - Email address
// - About
// - Profile picture

// if have 2 models, user & profile, then all user here needs to be changed to profile *
// has to link these 2 models together.
// suggest only have 1 model, since this is simple form, unless chat is complicated.
// but 2 models, how to link the loggedin-user with the user's profile model...?

import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// user pass from Login
const SetupProfile = (user) => {
    const [userData, setUserData] = useState(null) // to prefill info, possible
    const [chars, setChars] = useState(200) // to calculate remaining char at About

    // const navigate = useNavigate()

    useEffect(()=> {
        if (user) { // *
            setUserData({...user}) // *
            // setChars({...user}.about.length) // *
        }
        // when refresh, will get loggedin user info and store it in above states.
    }, [user]) // ? if links 2 models

    const handleChange = (event) => {
        const {name, value} = event.target
        
        // handle characters remaining
        if (name === "about") {
            // setChars(200 - value.length)
        }

        // Set whatever user enter as userData, so it will store in userData
        // After user created account, and want to come back to edit, userData will have the info
        // because useEffect will not kick in until user change or refresh.
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        // url needs to be changed to our backend, profle model if 2 models
        const res = await fetch (`/v1/profiles/${user._id}`, {
            method: "PUT",
            body: formData
        })
        const data = await res.json()
        setUser(data) // * setProfile if profile model, needs to link to user model
        // navigate(/* redirect user to where? */)
    }

    return (
        <>
            {/* user?.preferredName or userData?.preferredName? userData might not work as null (initial state) */}
            <h2>{user?.preferredName ? "Edit Profile" : "Create An Account!"}</h2>
            {/* conditional rendering fpr <p> too */}
            <p>Tell us more about you</p>
            <form>
                <label htmlFor="preferredName">Preferred Name:</label>
                <input 
                    type="text" placeholder="Preferred Name" id="preferredName" required
                    name="preferredName"
                    // value={userData.preferredName}
                    // onChange={handleChange}
                />

                <br />

                <label htmlFor="email">Email Address:</label>
                <input 
                    type="email" placeholder="Email Address" id="email" required
                    name="email"
                    // value={userData.email}
                    // onChange={handleChange}
                />

                <br />

                <label htmlFor="about">About:</label>
                <input 
                    type="text" placeholder="About you" id="about" required
                    name="about"
                    // value={userData.about}
                    // onChange={handleChange}
                />
                {/* this needs to be part of the form as display msg */}
                <p>{chars} Characters Remaining.</p>

                <br />

                <label htmlFor="img">Profile Picture</label>
                <input 
                    type="file" id="img" required
                    name="img"
                />

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default SetupProfile