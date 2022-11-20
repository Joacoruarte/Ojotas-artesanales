
import React, { useEffect, useState } from 'react'
import AuthContext from './AuthContext'


export default function AuthProvider({children}) {
  const [user, setUser] = useState({})
  useEffect(()=> {
    if(typeof window !== 'undefined') {
      const userStorage = localStorage.getItem('user')
      if(userStorage) {
        setUser(JSON.parse(userStorage))
      }
    }
  }, [])
  return (
    <AuthContext.Provider value={{
        user,
        setUser,
    }}>
        {children}
    </AuthContext.Provider>
  )
}
