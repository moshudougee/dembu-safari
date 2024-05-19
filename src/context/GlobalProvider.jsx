'use client'
import { getLoggedInUser } from '@/lib/server/userActions'
import React, { createContext, useContext, useEffect, useState } from 'react'

const GlobalContext = createContext()


const GlobalProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [path, setPath] = useState('/')

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
      getLoggedInUser().then((res) => {
        if (res) {
            setLoggedIn(true)
            setUser(res)
        }else {
            setLoggedIn(false)
            setUser(null)
        }
      }).catch((error) => {
        console.log("No user logged in")
      }).finally(() => {
        setLoading(false)
      })
    }, [])

    useEffect(() => {
      if (ls) {
        if(ls.getItem('path')) {
          setPath(JSON.parse(ls.getItem('path'))) 
        } else {
        ls.setItem('path', JSON.stringify(path))
        }
      }
    }, [])

    const updatePath = (current) => {
      setPath(() => {
        if (ls) {
          ls.setItem('path', JSON.stringify(current))
        }
        return current
      })
    }
    
    
  return (
    <GlobalContext.Provider value={{ 
        loggedIn,
        setLoggedIn, 
        user,
        setUser, 
        loading,
        path,
        updatePath 
        }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider

export const useGlobalContext = () => useContext(GlobalContext)