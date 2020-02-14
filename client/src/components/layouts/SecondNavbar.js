import React, { Fragment, useContext, useEffect } from 'react'
import TimeContext from '../../context/time/timeContext'

const SecondNavbar = () => {
  const timeContext = useContext(TimeContext)
  const { time, date, setTime } = timeContext
  useEffect(() => {
    setInterval(setTime, 1000)
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <div className='jumbotron text-center'>
        <h1>Study Time Tracker</h1>
        <h3>
          <span id='getDate'>{date}</span>{' '}
        </h3>
        <h1>
          <div id='getTime' style={{ height: '30px' }} className='text-info'>
            {time}
          </div>
        </h1>
      </div>
    </Fragment>
  )
}

export default SecondNavbar
