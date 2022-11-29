import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { useContext } from "react"
import Home from "./components/Home"
import EditProfile from "./components/EditProfile"
import UserProfile from "./components/UserProfile"
import { AuthContext } from "./contexts/AuthContext"

function App() {

  const { currentUser }  = useContext(AuthContext)


  // redirects user to login page if not logged in
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />
    }
    return children
  }

  return (
    <div className="App">
      <div>
        {/* <Navbar /> */}
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<Login />} /> 
              {/* protected: home page with chats */}
              <Route path='/chatapp/home' element={<ProtectedRoute>
                <Home />
              </ProtectedRoute>} />
              {/* protected: editing user profile page */}
              <Route path='/chatapp/profile' element={<ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>} />
              {/* protected: user profile page */}
              <Route path='/chatapp/userprofile' element={<ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>} /> 
              {/* register page */}
              <Route path='/chatapp/register' element={<Register />} />
              {/* login page */}
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  )
}

export default App