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
          Study{' '}
          <strong
            className='bg-info text-light'
            style={{ padding: '5px', borderRadius: '10px' }}
          >
            Tracker
          </strong>{' '}
          2020
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            <span>
              {authContext.isAuthenticated ? (
                <span>
                  Signed in as: <Link to='/'>{user ? user.name : 'User'}</Link>
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
