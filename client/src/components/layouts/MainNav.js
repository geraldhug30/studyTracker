import React, { Fragment, useContext } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const MainNav = () => {
  const authContext = useContext(AuthContext)
  const { logout, user } = authContext
  return (
    <Fragment>
      <Navbar>
        <Navbar.Brand>Study Tracker 2020</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            {authContext.isAuthenticated ? (
              <span>
                Signed in as: <Link to='/'>{user ? user.name : 'User'}</Link>
                <span>
                  {' | '}
                  <Link variant='secondary' onClick={logout} to='/'>
                    Logout
                  </Link>
                </span>
              </span>
            ) : (
              <span>
                <Link to='/Register'>Register</Link>
                {' | '}
                <Link to='/login'>Login</Link>
              </span>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  )
}

export default MainNav
