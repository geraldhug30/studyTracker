import React, { useEffect, useContext } from 'react'
import AuthContext from '../context/auth/authContext'
import SecondNavbar from '../components/layouts/SecondNavbar'
import RecordForm from '../components/records/RecordForm'
import Record from '../components/records/Record'
import { Link } from 'react-router-dom'
import RecordFilter from '../components/records/RecordFilter'

const Home = () => {
  const authContext = useContext(AuthContext)
  const { loadUser } = authContext

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='mb-5'>
      <SecondNavbar />
      <div className='text-right'>
        <Link to='/all'>
          <span>View all public records</span>
        </Link>
      </div>

      <div className='row'>
        <div className='col-sm-7 text-center bg-light'>
          <RecordForm />
        </div>
        <div className='col-sm-5 bg-light'>
          <RecordFilter />
          <Record />
        </div>
      </div>
    </div>
  )
}

export default Home
