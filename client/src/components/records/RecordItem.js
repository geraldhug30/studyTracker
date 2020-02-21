import React, { Fragment, useContext } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TimeContext from '../../context/time/timeContext'
var HtmlToReactParser = require('html-to-react').Parser

const RecordItem = item => {
  var htmlToReactParser = new HtmlToReactParser()

  const timeContext = useContext(TimeContext)
  const { getSpecificData } = timeContext

  const { _id, title, timeIn, timeOut, body, privacy } = item.props
  // parse html
  var reactElement = htmlToReactParser.parse(body)
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
