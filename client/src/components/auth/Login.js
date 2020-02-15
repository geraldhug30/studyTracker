import React, { useState, useContext, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import AuthContext from '../../context/auth/authContext'
import Alerts from '../layouts/Alerts'
import AlertContext from '../../context/alert/alertContext'
const Login = props => {
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)
  const { userLogin, isAuthenticated, error } = authContext
  const { setAlert } = alertContext
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { email, password } = user

  useEffect(() => {
    if (isAuthenticated) props.history.push('/')
    if (error === 'Invalid Credential') setAlert(error, 'danger')
    // eslint-disable-next-line
  }, [isAuthenticated, error])

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (!email || !password) {
      return setAlert('Please fill all fields', 'danger')
    }

    userLogin({ email, password })
  }
  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh'
  }
  return (
    <div style={divStyle} className='mt-5'>
      <Form onSubmit={onSubmit}>
        <Alerts />
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Enter email'
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Password'
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Login
