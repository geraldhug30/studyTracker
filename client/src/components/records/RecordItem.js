import React, { Fragment, useContext } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TimeContext from '../../context/time/timeContext'

const RecordItem = item => {
  const timeContext = useContext(TimeContext)
  const { getSpecificData } = timeContext
  const { _id, title, timeIn, timeOut, privacy } = item.props
  // parse html

  const getRecord = async () => {
    await getSpecificData(_id)
  }
  return (
    <Fragment>
      <Card bg='light' text='gray'>
        <Card.Header>
          {' '}
          <Row>
            <Col sm={8}>
              <strong>{title}</strong>
            </Col>
            <Col
              sm={4}
              className={
                'badge ' +
                (privacy === 'public' ? 'badge-success' : 'badge-primary')
              }
            >
              {privacy.charAt(0).toUpperCase() + privacy.slice(1)}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <p>
            <strong className='text-success'>Starting</strong> {timeIn}
          </p>
          <p>
            <strong className='text-danger'>End </strong> {timeOut}
          </p>

          <Link to='/record'>
            <Button onClick={getRecord} className='bg-info' block>
              <span>
                <i class='fas fa-digital-tachograph'></i>
              </span>{' '}
              More...
            </Button>
          </Link>
        </Card.Body>
      </Card>
      <br />
    </Fragment>
  )
}

export default RecordItem
