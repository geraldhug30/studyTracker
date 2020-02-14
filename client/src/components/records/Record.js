import React, { useContext, useEffect } from 'react'
import RecordItem from './RecordItem'
import TimeContext from '../../context/time/timeContext'
import { Spinner } from 'react-bootstrap'
// import Spinner from '../layouts/Spinner'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Record = () => {
  const timeContext = useContext(TimeContext)
  const { getData, records, user, loading } = timeContext

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [user])

  if (loading) {
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
    <div style={{ overflow: 'auto', height: '400px' }}>
      <h3>History</h3>
      {records.length !== 0 &&
        records.map(record => <RecordItem props={record} key={record._id} />)}
    </div>
  )
}

export default Record
