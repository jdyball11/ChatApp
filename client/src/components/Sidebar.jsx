import Search from "./Search"
import Contacts from "./Contacts"
import Navbar from "./Navbar"

const Sidebar = ({handleSetSideBar}) => {

    return (
        <div className="h-screen w-[300px] bg-dcBlue grid-rows-sideBarLayout
        sm:grid hidden">
        <Navbar />
        <Search />  
        <Contacts handleSetSideBar={handleSetSideBar}/>
        </div>
    )
}

export default Sidebar