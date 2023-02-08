import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Nav from './Nav'
import Profile from './Profile'
import NewTrip from './NewTrip'
import Drafts from './Drafts'
import Plans from './Plans'
import Cities from './Cities'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <Nav />
      <Switch>
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
          <h1>Base</h1>
        </Route>
      </Switch>
    </div>
  )
}

export default App