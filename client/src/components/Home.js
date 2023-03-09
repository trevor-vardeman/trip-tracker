import { useUserContext } from '../context/UserContext'
import Stack from 'react-bootstrap/Stack'
import Login from './Login'

function Home() {
  const user = useUserContext()

  if (user) {
    return (
      <Stack className="centered" gap={3}>
        <h1>Welcome to Trip!</h1>
        <p>To create a new trip, click "New Trip!"</p>
        <p>With Drafts, you can store all the trips you're creating.</p>
        <p>In Plans, you can see which plans you've already finalized.</p>
        <p>Cities show you all the cool cities you're planning on going to!</p>
        <p>Tags will show you what tags are in your trips, and you can see Tags that others have created too.</p>
      </Stack>
    )
  } else {
    return (
      <Login />
    )
  }
}

export default Home