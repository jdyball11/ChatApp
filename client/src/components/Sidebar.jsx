import Search from "./Search"
import Contacts from "./Contacts"
import Navbar from "./Navbar"

const Sidebar = () => {

    return (
        <div className="grid h-screen bg-dcBlue grid-rows-sideBarLayout">
        <Navbar />
        <Search />  
        <Contacts />
        </div>
    )
}

export default Sidebar