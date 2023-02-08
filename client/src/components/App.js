import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Auth from './Auth'
import Nav from './Nav'

function App() {
  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/">
            <Nav />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App