import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Button, ButtonGroup } from 'react-bootstrap'
import TimeContext from '../../context/time/timeContext'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

import Spinner from '../../components/layouts/Spinner'
const RecordResult = props => {
  const timeContext = useContext(TimeContext)
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)
  const { record, loading, deleteItem, clearAll } = timeContext
  const { _id, title, body, timeIn, timeOut, date, duration } = record

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
        <Table variant='light' className='mt-5' striped bordered hover>
          <thead>
            <tr>
              <th>Title: </th>
              <th>{title}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Time In:</td>
              <td>{timeIn}</td>
            </tr>
            <tr>
              <td className='text-nowrap'>Time Out:</td>
              <td>{timeOut}</td>
            </tr>
            <tr>
              <td>Duration:</td>
              <td>{minutes} minutes</td>
            </tr>
            <tr>
              <td className='text-nowrap'>Date Created:</td>
              <td>{result}</td>
            </tr>
            <tr>
              <td>Body</td>
              <td>{body}</td>
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
