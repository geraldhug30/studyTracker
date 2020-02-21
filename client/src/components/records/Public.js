import React, { useEffect, useContext } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PublicRecords from './PublicRecord'
import TimeContext from '../../context/time/timeContext'
import Spinner from '../layouts/Spinner'
const Public = props => {
  const timeContext = useContext(TimeContext)
  const { getPublicData, privacy } = timeContext

  useEffect(() => {
    getPublicData()
    // eslint-disable-next-line
  }, [])

  if (!privacy) {
    return (
      <Spinner
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%'
        }}
        animation='border'
        variant='primary'
      />
    )
  }

  return (
    <Container className='mb-5'>
      <p className='m-3'>
        <Link to='/'>
          <Button variant='dark'>Back</Button>
        </Link>
      </p>
      <p> All Public Records: </p>
      <p className='text-center'>
        {privacy !== null &&
          privacy.map(data => (
            <div>
              <hr />
              <PublicRecords props={data} key={data._id} />
            </div>
          ))}
      </p>
    </Container>
  )
}

export default Public
