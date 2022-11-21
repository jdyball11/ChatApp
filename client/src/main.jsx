import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext"
import { ChatContextProvider } from './contexts/ChatContext'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,

)
