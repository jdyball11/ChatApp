import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"
import ForTesting from "./components/ForTesting"
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
      return <Navigate to="/chatapp/login" />
    }
    return children
  }

  return (
    <div className="App">
      <div>
        {/* <Navbar /> */}
        <BrowserRouter>
          <Routes>
            <Route path='/chatapp/'>
              {/* protected: home page with chats */}
              <Route path='home' element={<ProtectedRoute>
                <Home />
              </ProtectedRoute>} />
              {/* protected: editing user profile page */}
              <Route path='profile' element={<ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>} />
              {/* protected: user profile page */}
              <Route path='userprofile' element={<ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>} /> 
              {/* register page */}
              <Route path='register' element={<Register />} />
              {/* login page */}
              <Route path='login' element={<Login />} />  
              
              {/* DELETE!!! For testing only */}
              <Route path='testing' element={<ForTesting />} />          
            </Route>
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  )
}

export default App