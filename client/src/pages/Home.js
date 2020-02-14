import React, { useEffect, useContext } from 'react'
import AuthContext from '../context/auth/authContext'
import SecondNavbar from '../components/layouts/SecondNavbar'
import RecordForm from '../components/records/RecordForm'
import Record from '../components/records/Record'

const Home = () => {
  const authContext = useContext(AuthContext)
  const { loadUser } = authContext

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <SecondNavbar />
      <div className='row'>
        <div className='col-sm-7 text-center bg-light'>
          <RecordForm />
        </div>
        <div className='col-sm-5 bg-light'>
          <Record />
        </div>
      </div>
    </div>
  )
}

export default Home
