import React, { useEffect, useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
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
    <Container>
      <Row className=' m-3'>
        <Col sm={1} className='text-center'>
          <Link to='/'>
            <Button variant='dark'>Back</Button>
          </Link>
        </Col>
        <Col sm={11}>
          {privacy !== null &&
            privacy.map(data => <PublicRecords props={data} key={data._id} />)}
        </Col>
      </Row>
    </Container>
  )
}

export default Public
