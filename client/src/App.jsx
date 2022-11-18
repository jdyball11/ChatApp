import Navbar from "./components/Navbar"
import Login from "./components/Login"

function App() {

  return (
    <div className="App">
      <div className="h-screen flex flex-col ">
        <Navbar />
        <div className="flex h-100">
          <Login />
        </div>

      </div>

    </div>
  )
}

export default App
