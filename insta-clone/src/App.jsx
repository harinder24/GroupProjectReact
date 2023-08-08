
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
import Search from './component/Search'
import Notification from './component/Notification'
import OtherProfile from './component/OtherProfile'
import Redirect from './component/Redirect'
import Post from './component/Post'
import Message from './component/Message'
import Messages from './component/Messages'


function App() {

  const [userBasicInfo, setUserBasicInfo] = useState({username: null, email: null, fullname: null})
  const [followingSuggestion, SetFollowingSuggestion] = useState([])
  useEffect(()=>{
      const x = db
      const a = auth

  },[])
  return (

    <Context.Provider value={{userBasicInfo, setUserBasicInfo, followingSuggestion, SetFollowingSuggestion}}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/explore' element={<Explore/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/reels' element={<Reels/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/notification' element={<Notification/>}/>
      <Route path="/profiles/:id" element={<OtherProfile/>} />
      <Route path="/redirect/:id" element={<Redirect/>} />
      <Route path="/post/:id" element={<Post/>} />
      <Route path="/message" element={<Message/>} />
      <Route path="/messages/:id" element={<Messages/>} />
    </Routes>
    
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
