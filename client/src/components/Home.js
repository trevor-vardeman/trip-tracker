import { useUserContext } from '../context/UserContext'
import Stack from 'react-bootstrap/Stack'
import Login from './Login'

function Home() {
  const user = useUserContext()

  if (user) {
    return (
      <Stack gap={3}>
        <h1>Welcome to Trip!</h1>
        <p>To create a new trip, click New Trip!</p>
        <p>With Drafts, you can compare multiple trips!</p>
        <p>In Plans, you can see which plans you've already finalized.</p>
        <p>Cities show you all the cool cities you're planning on going to!</p>
      </Stack>
    )
  } else {
    return (
      <Login />
    )
  }
}

export default Home