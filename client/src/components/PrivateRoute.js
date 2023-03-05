// import { Route, Redirect } from 'react-router-dom'
// import { useUserContext, useUserAuthCheck } from '../context/UserContext'

// function PrivateRoute({ children, ...rest }) {
//   const user = useUserContext()
//   const { authChecked } = useUserAuthCheck()

//   if (!authChecked) {
//     return null
//   } else {
//     return (
//       <Route
//         {...rest}
//         render={({ location }) =>
//           user ? (
//             children
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: location }
//               }}
//             />
//           )
//         }
//       />
//     )
//   }
// }

// export default PrivateRoute