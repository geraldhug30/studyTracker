import React, { useState, useContext, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'
import Alerts from '../layouts/Alerts'

const Register = props => {
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)
  const { register, isAuthenticated, error } = authContext

  const { setAlert } = alertContext
  useEffect(() => {
    if (isAuthenticated) props.history.push('/')
    if (error === 'Users is already exists')
      setAlert('User is already register', 'danger')
    // eslint-disable-next-line
  }, [isAuthenticated, error])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    if (password !== password2) {
      setAlert('password not match', 'light')
      return
    }

    if (password.length < 5)
      return setAlert('Password must be 5 character or more...', 'danger')
    if (error) return setAlert(error, 'danger')
    register({ name, email, password })
  }

  const formStyle = {
    padding: '30px',
    borderRadius: '30px'
  }
  const divStyle = {
    justifyContent: 'center',
    float: 'none',
    margin: '0 auto',
    width: '70%',
    alignItems: 'center'
  }

  return (
    <div style={divStyle}>
      <h2 className='text-center m-4'>Register</h2>
      <Alerts />
      <Form
        className='text-light bg-dark'
        style={formStyle}
        onSubmit={onSubmit}
      >
        <Form.Group controlId='formGroupName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={onChange}
            name='name'
            value={name}
            placeholder='First name'
            required
          />
        </Form.Group>
        <Form.Group controlId='formGroupEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={onChange}
            name='email'
            value={email}
            type='email'
            placeholder='Email'
            autoComplete='off'
            required
          />
        </Form.Group>
        <Form.Group controlId='formGroupPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            onChange={onChange}
            value={password}
            placeholder='Password'
            autoComplete='off'
            required
          />
        </Form.Group>
        <Form.Group controlId='formGroupCPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            name='password2'
            onChange={onChange}
            value={password2}
            placeholder='Confirm Password'
            autoComplete='off'
            required
          />
        </Form.Group>
        <Button type='submit' block>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Register
