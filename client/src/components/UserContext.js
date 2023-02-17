import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

const UserContext = React.createContext()
const UserLogin = React.createContext()
const UserLogout = React.createContext()
const UserRegister = React.createContext()
const UserUpdate = React.createContext()

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

export function useUserUpdate() {
  return useContext(UserUpdate)
}

export function UserProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const history = useHistory()

  useEffect(() => {
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
            history.push("/")
          })
        } else {
          r.json().then(data => alert(`${Object.keys(data.error)[0]} ${Object.values(data.error)[0][0]}`))
        }
      })
      .catch(e => alert(e))
  }

  function login(username, password) {
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
            console.log(user)
            setUserLoggedIn(true)
            history.push("/")
          })
        } else {
          r.json().then(data => alert(data.error))
        }
      })
      .catch(e => alert(e))
  }

  function logout() {
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

  function update(user) {
    setUser(user)
    console.log("update in context", user)
  }

  return (
    <UserContext.Provider value={user}>
      <UserRegister.Provider value={register}>
        <UserLogin.Provider value={login}>
          <UserLogout.Provider value={logout}>
            <UserUpdate.Provider value={update}>
              {children}
            </UserUpdate.Provider>
          </UserLogout.Provider>
        </UserLogin.Provider>
      </UserRegister.Provider>
    </UserContext.Provider>
  )
}