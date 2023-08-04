
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './component/MainPage'
import Signup from './component/Signup'
import Context from './context'
import "firebase/compat/firestore";
import Profile from './component/Profile'
import Explore from './component/Explore'
import Login from './component/Login'
import { useEffect, useState } from 'react'
import { auth, db } from './config'
import Create from './component/Create'
import Reels from './component/Reels'

function App() {

  const [userBasicInfo, setUserBasicInfo] = useState({username: null, email: null, fullname: null})
  useEffect(()=>{
      const x = db
      const a = auth

  },[])
  return (

    <Context.Provider value={{userBasicInfo, setUserBasicInfo}}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/explore' element={<Explore/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/reels' element={<Reels/>}/>
    </Routes>
    
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
