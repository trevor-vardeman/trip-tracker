import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Nav from './Nav'
import Register from './Register'
import Login from './Login'
import Profile from './Profile'
import NewTrip from './NewTrip'
import Drafts from './Drafts'
import Plans from './Plans'
import Cities from './Cities'
import { UserProvider } from './UserContext'

export const UserContext = React.createContext()

function App() {
  return (
    <UserProvider className="App">
      <Nav />
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/new-trip">
          <NewTrip />
        </Route>
        <Route path="/drafts">
          <Drafts />
        </Route>
        <Route path="/plans">
          <Plans />
        </Route>
        <route path="/cities">
          <Cities />
        </route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </UserProvider>
  )
}

export default App