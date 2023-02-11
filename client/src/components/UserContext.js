import React, { useContext, useState, useEffect } from 'react'

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
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then(user => {
          console.log(user)
          setUserId(user.id)
          setUsername(user.username)
          setUserLoggedIn(true)
        })
      } else {
        console.log("User not logged in.")
      }
    })}
  )

  function login(user) {
    setUserLoggedIn(true)
    console.log(user, "UserContext")
  }

  function logout() {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }})
      // .then(r => r.json())
      .then(() => {
        setUserLoggedIn(false)
        setUserId(null)
        setUsername(null)
      })
      .catch(err => alert(err.message))
  }

  return (
    <UserContext.Provider value={userLoggedIn}>
      <UserLoginUpdate.Provider value={login}>
        <UserLogoutUpdate.Provider value={logout}>
          {children}
        </UserLogoutUpdate.Provider>
      </UserLoginUpdate.Provider>
    </UserContext.Provider>
  )
}