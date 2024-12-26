import React from 'react'
import Home from './components/Home'
import { Route,Router,Routes,BrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import { LoginProvider } from './components/LoginContext'

function App() {
  return (
    <div>
      <LoginProvider>
      
      <Routes>
      <Route  path="/Home" element={<Home/>} />
      <Route  path="/login" element={<Login/>} />
     
      </Routes>
      </LoginProvider>
      
    </div>
  )
}

export default App