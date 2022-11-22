import Search from "./Search"
import Chats from "./Chats"
import Navbar from "./Navbar"

const Sidebar = () => {

    return (
        <div className="flex-1 w-64 h-screen border-r-2 bg-grey">
        <Navbar />
        <Search />  
        <Chats />
        </div>
    )
}

export default Sidebar