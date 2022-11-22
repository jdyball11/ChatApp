import Search from "./Search"
import Chats from "./Chats"

const Sidebar = () => {

    return (
        <div className="flex-1 w-64 border-r-2 bg-grey">
        <Search />  
        <Chats />
        </div>
    )
}

export default Sidebar