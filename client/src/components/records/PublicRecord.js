import React from 'react'
import { Card } from 'react-bootstrap'
var HtmlToReactParser = require('html-to-react').Parser

const PublicRecord = ({ props }) => {
  const { title, body, date } = props

  // parse body
  var htmlToReactParser = new HtmlToReactParser()
  var reactElement = htmlToReactParser.parse(body)

  //convert date created
  let dateCreated = Date.parse(date)
  function taskDate(dateMilli) {
    var d = (new Date(dateMilli) + '').split(' ')
    d[2] = d[2] + ','

    return [d[0], d[1], d[2], d[3]].join(' ')
  }
  const result = taskDate(dateCreated)

  return (
    <Card className='mb-1'>
      <Card.Header className='text-center'>
        <strong>{title}</strong>
      </Card.Header>
      <Card.Body>
        <Card.Text>{reactElement}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted text-center'>{result}</Card.Footer>
    </Card>
  )
}

export default PublicRecord
