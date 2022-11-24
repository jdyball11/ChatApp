import React, { useState } from "react"
import useDarkSide from "./useDarkSide"
import { DarkModeSwitch } from "react-toggle-dark-mode"


const Switcher = () => {
    // useDarkSide is to remember user's preference (dark / light)
    const [colorTheme, setTheme] = useDarkSide()
    const [darkSide, setDarkSide] = useState(colorTheme === "light" ? true : false)

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme)
        setDarkSide(checked)
    }

    return (
        <div className="m-2">
            <DarkModeSwitch 
                checked={darkSide}
                onChange={toggleDarkMode}
                size={20}
                sunColor="white"
                moonColor="mediumslateblue"
            />
        </div>
    )
}

export default Switcher