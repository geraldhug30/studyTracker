import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Button, ButtonGroup } from 'react-bootstrap'
import TimeContext from '../../context/time/timeContext'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import ReactHtmlParser from 'react-html-parser'
import Spinner from '../../components/layouts/Spinner'

const RecordResult = props => {
  const timeContext = useContext(TimeContext)
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)
  const { record, loading, deleteItem, clearAll } = timeContext
  const { _id, title, body, timeIn, timeOut, date, duration, privacy } = record

  if (authContext.isAuthenticated === null && loading) props.history.push('/')

  const deleteThis = () => {
    deleteItem(_id)
    alertContext.setAlert('Item deleted', 'success')
    clearAll()
    goToEdit()
  }
  const goToEdit = () => {
    props.history.push('/')
  }
  const backToHome = () => {
    clearAll()
    goToEdit()
  }

  //convert date created
  let dateCreated = Date.parse(date)
  function taskDate(dateMilli) {
    var d = (new Date(dateMilli) + '').split(' ')
    d[2] = d[2] + ','

    return [d[0], d[1], d[2], d[3]].join(' ')
  }
  const result = taskDate(dateCreated)

  // convert duration to minute
  const minutes = Math.floor(duration / 60)

  return (
    <Container>
      {title ? (
        <Table variant='light' className='mt-5 mb-5' striped bordered hover>
          <thead>
            <tr>
              <th>Title: </th>
              <th>
                <strong>{title}</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Time In:</th>
              <td>{timeIn}</td>
            </tr>
            <tr>
              <th className='text-nowrap'>Time Out:</th>
              <td>{timeOut}</td>
            </tr>
            <tr>
              <th>Duration:</th>
              <td>{minutes} minutes</td>
            </tr>
            <tr>
              <th>Privacy type:</th>
              <td>{privacy}</td>
            </tr>
            <tr>
              <th className='text-nowrap'>Date Created:</th>
              <td>{result}</td>
            </tr>
            <tr>
              <th>Body</th>
              <td>
                <p>{ReactHtmlParser(body)}</p>
              </td>
            </tr>
            <tr>
              <td>
                <Link to='/'>
                  <Button onClick={backToHome} variant='dark'>
                    Back
                  </Button>
                </Link>
              </td>
              <td className='d-flex flex-column'>
                <ButtonGroup toggle block='true'>
                  <Button onClick={goToEdit} variant='primary'>
                    Edit
                  </Button>
                  <Button onClick={deleteThis} variant='danger'>
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <Spinner />
      )}
    </Container>
  )
}

export default RecordResult
