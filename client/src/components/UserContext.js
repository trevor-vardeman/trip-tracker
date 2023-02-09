import React, { useContext, useState } from 'react'

const UserContext = React.createContext()
const UserLoginUpdate = React.createContext()
const UserLogoutUpdate = React.createContext()

export function useUserContext() {
  return useContext(UserContext)
}

export function useUserLoginUpdate() {
  return useContext(UserLoginUpdate)
}

export function useUserLogoutUpdate() {
  return useContext(UserLogoutUpdate)
}

export function UserProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState("false", false)

  function handleLogin() {
    setUserLoggedIn("true", true)
  }

  function handleLogout() {
    setUserLoggedIn("false", false)
  }

  return (
    <UserContext.Provider value={userLoggedIn}>
      <UserLoginUpdate.Provider value={handleLogin}>
        <UserLogoutUpdate.Provider value={handleLogout}>
          {children}
        </UserLogoutUpdate.Provider>
      </UserLoginUpdate.Provider>
    </UserContext.Provider>
  )
}