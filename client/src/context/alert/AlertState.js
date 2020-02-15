import React, { useReducer, useContext } from 'react'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import uuid from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from '../types'
import AuthContext from '../auth/authContext'

const AlertState = props => {
  const authContext = useContext(AuthContext)

  const initialState = []

  const [state, dispatch] = useReducer(AlertReducer, initialState)

  const setAlert = (msg, type, timeout = '2000') => {
    const id = uuid.v4()
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    })
    setTimeout(() => {
      authContext.clearErrors()
      dispatch({ type: REMOVE_ALERT, payload: id })
    }, timeout)
  }
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState
