import React, { useContext, useEffect, Fragment } from 'react'
import RecordItem from './RecordItem'
import TimeContext from '../../context/time/timeContext'
import { Spinner } from 'react-bootstrap'

// import Spinner from '../layouts/Spinner'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Record = () => {
  const timeContext = useContext(TimeContext)
  const { getData, records, user, loading, filtered } = timeContext

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
    <Fragment>
      <h3>Saved Notes:</h3>
      <div style={{ overflow: 'auto', height: '510px' }}>
        {records.length === 0 ? (
          <p> Add your first note here </p>
        ) : filtered !== null ? (
          filtered.map(record => <RecordItem props={record} key={record._id} />)
        ) : (
          records.map(record => <RecordItem props={record} key={record._id} />)
        )}
      </div>
    </Fragment>
  )
}

export default Record
