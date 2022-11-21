import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useContext } from "react"
import Chat from "./components/Chat"
import EditProfile from "./components/EditProfile"
import { AuthContext } from "./authContext"

function App() {

  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)

  return (
    <div className="App">
      <div>

        {/* <Navbar /> */}
        <BrowserRouter>
          <Routes>
            <Route path='/chatapp/register' element={<Register />} />
            <Route path='/chatapp/login' element={<Login />} />
            <Route path='/chatapp/home' element={<Chat />} />
            <Route path='/chatapp/editProfile' element={<EditProfile />} />
          </Routes>
        </BrowserRouter>


      </div>

    </div>
  )
}

export default App