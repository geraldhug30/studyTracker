import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// import AuthContext from '../../context/auth/authContext'
const PrivateRoute = ({ component: Component, ...rest }) => {
  // const authContext = useContext(AuthContext)
  // const { isAuthorized, loading } = authContext
  return (
    <Route
      {...rest}
      render={props =>
        !localStorage.token ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
