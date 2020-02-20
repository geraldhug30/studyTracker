import React from 'react'
import { Container } from 'react-bootstrap'
const About = () => {
  return (
    <Container className='text-center mb-5'>
      <h1 className='text-center m-4'>
        Study{' '}
        <span
          className='bg-info text-light'
          style={{ padding: '10px', borderRadius: '10px' }}
        >
          Tracker
        </span>{' '}
      </h1>

      <p>
        This app is very useful to all student who want to track their study and
        time consume. Using the latest real time update and time system
        computation. Also, with complete CRUD system and Authentication system.
      </p>
      <p>
        {' '}
        Any information or input are not secured guaranteed. Use the app at your
        own risk.
      </p>
      <br />
      <p>version: 0.12</p>
      <h5>Created By: </h5>
      <p>Gerald Hero Hug</p>
      <h5>Co Developer: </h5>
      <p>Wilbert Nacu</p>
      <hr />
      <p>
        Powered by: <span className='text-primary'>React</span> and{' '}
        <span className='text-success'>Mongo Atlas</span>
      </p>
    </Container>
  )
}

export default About
