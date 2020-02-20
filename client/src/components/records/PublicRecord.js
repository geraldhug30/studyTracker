import React from 'react'
import { Card } from 'react-bootstrap'
var HtmlToReactParser = require('html-to-react').Parser

const PublicRecord = ({ props }) => {
  const { title, body, date } = props
  var htmlToReactParser = new HtmlToReactParser()
  var reactElement = htmlToReactParser.parse(body)

  return (
    <Card>
      <Card.Header>
        <strong>{title}</strong>
      </Card.Header>
      <Card.Body>
        <Card.Text>{reactElement}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{date}</Card.Footer>
    </Card>
  )
}

export default PublicRecord
