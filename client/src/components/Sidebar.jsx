import Search from "./Search"
import Chats from "./Chats"
import Navbar from "./Navbar"

const Sidebar = () => {

    return (
        <div className="flex-col w-96 h-screen border-r-2 bg-grey grid-rows-auto">
        <Navbar />
        <Search />  
        <Chats />
        </div>
    )
}

export default Sidebar