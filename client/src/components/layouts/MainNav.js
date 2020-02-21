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
        <Navbar.Brand>
          <span className='text-info'>
            <i class='fab fa-studiovinari'></i>
          </span>{' '}
          Study{' '}
          <strong
            className='bg-info text-light'
            style={{ padding: '5px', borderRadius: '10px' }}
          >
            Tracker
          </strong>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            <span>
              {authContext.isAuthenticated ? (
                <span>
                  <Link to='/'>
                    {user
                      ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                      : 'User'}
                  </Link>
                  <span>
                    {' | '}
                    <Link
                      variant='secondary'
                      className='text-danger'
                      onClick={logout}
                      to='/'
                    >
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
              {' | '}
              <Link to='/about'>About</Link>
            </span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  )
}

export default MainNav
