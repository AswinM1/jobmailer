import React from 'react'
import Home from './components/Home'
import { Route,Router,Routes,BrowserRouter } from 'react-router-dom'
import Login from './components/Login'

function App() {
  return (
    <div>
      
      <Routes>
      <Route  path="/" element={<Home/>} />
      <Route  path="/login" element={<Login/>} />
     
      </Routes>
      
    </div>
  )
}

export default App