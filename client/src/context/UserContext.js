import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

const UserContext = React.createContext()
const UserLogin = React.createContext()
const UserLogout = React.createContext()
const UserRegister = React.createContext()
const UserUpdate = React.createContext()
const UserAuthCheck = React.createContext()

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

export function useUserAuthCheck() {
  return useContext(UserAuthCheck)
}

export function UserProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  // const [authChecked, setAuthChecked] = useState(false)
  const history = useHistory()
  // console.log(authChecked)

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then(user => {
          setUser(user)
          // localStorage.setItem("user", user)
          // setAuthChecked(true)
          setUserLoggedIn(true)
        })
      } else {
        // setAuthChecked(true)
      }
  })},[userLoggedIn])

  const register = (username, password, passwordConfirmation) => {
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
            setUser(user)
            // localStorage.setItem(user)
            // setAuthChecked(true)
            setUserLoggedIn(true)
            history.push("/")
          })
        } else {
          r.json().then(data => alert(`${Object.keys(data.error)[0]} ${Object.values(data.error)[0][0]}`))
        }
      })
      .catch(e => alert(e))
  }

  const login = (username, password) => {
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
          r.json().then(() => {
            setUser(user)
            // localStorage.setItem(user)
            // setAuthChecked(true)
            setUserLoggedIn(true)
            history.push("/")
          })
        } else {
          r.json().then(data => alert(data.error))
        }
      })
      .catch(e => alert(e))
  }

  const logout = () => {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }})
      .then(() => {
        setUser(null)
        setUserLoggedIn(false)
        // setAuthChecked(false)
        // localStorage.clear()
        history.push("/")
      })
      .catch(err => alert(err.message))
  }

  const update = user => {
    console.log("updated user from context", user)
    setUser(user)
  }

  return (
    <UserContext.Provider value={user}>
      <UserRegister.Provider value={register}>
        <UserLogin.Provider value={login}>
          <UserLogout.Provider value={logout}>
            <UserUpdate.Provider value={update}>
              {/* <UserAuthCheck.Provider value={authChecked}> */}
                {children}
              {/* </UserAuthCheck.Provider> */}
            </UserUpdate.Provider>
          </UserLogout.Provider>
        </UserLogin.Provider>
      </UserRegister.Provider>
    </UserContext.Provider>
  )
}