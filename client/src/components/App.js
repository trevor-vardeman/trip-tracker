import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import Home from './Home'
import Nav from './Nav'
import Register from './Register'
import Login from './Login'
import Profile from './Profile'
import NewTrip from './NewTrip'
import TripContainer from './TripContainer'
import Drafts from './Drafts'
import Plans from './Plans'
import Cities from './Cities'
import Tags from './Tags'
// import PrivateRoute from './PrivateRoute'
import { UserProvider } from '../context/UserContext'
import { TripProvider } from '../context/CurrentTripContext'
import { CityProvider } from '../context/CurrentCityContext'

export const UserContext = React.createContext()
export const CurrentTripContext = React.createContext()
export const CurrentCityContext = React.createContext()

function App() {
  return (
    <Stack>
      <UserProvider>
        <TripProvider>
          <CityProvider>
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
              <Route path="/trips/:id">
                <TripContainer />
              </Route>
              <Route path="/drafts">
                <Drafts />
              </Route>
              <Route path="/plans">
                <Plans />
              </Route>
              <Route path="/cities">
                <Cities />
              </Route>
              <Route path="/tags">
                <Tags />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </CityProvider>
        </TripProvider>
      </UserProvider>
    </Stack>
  )

  // return (
  //   <Stack direction="horizontal">
  //     <UserProvider className="App">
  //       <TripProvider>
  //         <CityProvider>
  //           <Nav />
  //           <Switch>
  //             <Route path="/register">
  //               <Register />
  //             </Route>
  //             <Route path="/login">
  //               <Login />
  //             </Route>
  //             <PrivateRoute path="/profile">
  //               <Profile />
  //             </PrivateRoute>
  //             <PrivateRoute path="/new-trip">
  //               <NewTrip />
  //             </PrivateRoute>
  //             <PrivateRoute path="/drafts/:id">
  //               <Trip />
  //             </PrivateRoute>
  //             <PrivateRoute path="/drafts">
  //               <Drafts />
  //             </PrivateRoute>
  //             <PrivateRoute path="/plans">
  //               <Plans />
  //             </PrivateRoute>
  //             <PrivateRoute path="/cities">
  //               <Cities />
  //             </PrivateRoute>
  //             <Route path="/">
  //               <Home />
  //             </Route>
  //           </Switch>
  //         </CityProvider>
  //       </TripProvider>
  //     </UserProvider>
  //   </Stack>
  // )
}

export default App