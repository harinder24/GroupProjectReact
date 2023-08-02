'use client'
 
import { createContext, useState } from 'react'
 
export const ThemeContext = createContext({})
 
export default function ThemeProvider({ children }) {
const [userData, setUserData] = useState({userName: "null", email: "null", fullName: "null"})

  return <ThemeContext.Provider value={{userData ,setUserData}}>{children}</ThemeContext.Provider>
}