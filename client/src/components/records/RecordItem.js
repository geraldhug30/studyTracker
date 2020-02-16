import React, { Fragment, useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TimeContext from '../../context/time/timeContext'
var HtmlToReactParser = require('html-to-react').Parser

const RecordItem = item => {
  var htmlToReactParser = new HtmlToReactParser()

  const timeContext = useContext(TimeContext)
  const { getSpecificData } = timeContext

  const { _id, title, timeIn, timeOut, body } = item.props
  // parse html
  var reactElement = htmlToReactParser.parse(body)
  const getRecord = async () => {
    await getSpecificData(_id)
  }
  return (
    <Fragment>
      <Card bg='secondary' text='white'>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Card.Title>
            {timeIn} to {timeOut}
          </Card.Title>
          <Card.Text>{reactElement}</Card.Text>
          <Link to='/record'>
            <Button onClick={getRecord} className='bg-info' block>
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
