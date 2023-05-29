import './App.css'

import React, {useState} from 'react';
import { Layout } from "./components/Layout/Layout"
import { LogIn } from './components/LogIn/LogIn';
export const AppContext = React.createContext();

function App() {
  const [user, setUser] = useState('')
  const [isOpen, setIsOpen] = useState(false)  
  const [page, setPage] = useState("Gym")
  const [pageType, setPageType] = useState("0")
  
  const value = {
    user: user, 
    setUser: setUser,
    isOpen: isOpen, 
    setIsOpen: setIsOpen,  
    page: page,
    setPage: setPage,
    pageType: pageType, 
    setPageType: setPageType
  }
  
  return (
    <AppContext.Provider value={value}>
      
      <LogIn/>
      {/* <Layout/> */}
    </AppContext.Provider>
  )
}

export default App
