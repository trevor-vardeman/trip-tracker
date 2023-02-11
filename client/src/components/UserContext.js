import React, { useContext, useState, useEffect } from 'react'

const UserContext = React.createContext()
const UserLogin = React.createContext()
const UserLogout = React.createContext()
const UserRegister = React.createContext()

export function useUserContext() {
  return useContext(UserContext)
}

export function useUserRegister() {
  return useContext(UserRegister)
}

export function useUserLogin() {
  return useContext(UserLogin)
}

export function useUserLogout() {
  return useContext(UserLogout)
}

export function UserProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log("UserContext component - useEffect `me` function")
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then(user => {
          console.log(user)
          setUser(user)
          setUserLoggedIn(true)
        })
      } else {
        console.log("User not logged in.")
      }
  })},[userLoggedIn])

  function register(username, password, passwordConfirmation) {
    console.log("UserContext component - register function")
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then(user => {
            console.log(user)
            setUser(user)
            setUserLoggedIn(true)
          })
        } else {
          r.json().then(data => alert(`${Object.keys(data.error)[0]} ${Object.values(data.error)[0][0]}`))
        }
      })
      .catch(e => alert(e))
  }

  function login(username, password) {
    console.log("UserContext component - login function")
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then(user => {
            setUserLoggedIn(true)
            console.log(user)
          })
        } else {
          r.json().then(data => alert(data.error))
        }
      })
      .catch(e => alert(e))
  }

  function logout() {
    console.log("UserContext component - logout function")
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }})
      .then(() => {
        setUser(null)
        setUserLoggedIn(false)
      })
      .catch(err => alert(err.message))
  }

  return (
    <UserContext.Provider value={userLoggedIn}>
      <UserRegister.Provider value={register}>
        <UserLogin.Provider value={login}>
          <UserLogout.Provider value={logout}>
            {children}
          </UserLogout.Provider>
        </UserLogin.Provider>
      </UserRegister.Provider>
    </UserContext.Provider>
  )
}