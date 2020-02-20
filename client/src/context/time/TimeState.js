import React, { useReducer } from 'react'
import TimeContext from './timeContext'
import TimeReducer from './timeReducer'

import axios from 'axios'
import {
  TIME_NOW,
  GET_TIME_IN,
  GET_TIME_OUT,
  CLEAR_ALL,
  STORE_DATA,
  ADD_DATA,
  RECORD_ERROR,
  GET_DATA,
  GET_SPECIFIC_DATA,
  DELETE_RECORD,
  UPDATE_DATA,
  GET_STORE_DATA,
  GET_PUBLIC_DATA
} from '../types'
import { date } from '../../components/DateAndTime'

const TimeState = props => {
  const { month, day, araw, year } = date()
  const today = `${month} ${day}, ${year}; ${araw}`

  const initialState = {
    date: today,
    time: null,
    timeIn: '',
    timeOut: '',
    privacy: null,
    duration: null,
    collection: [],
    records: [],
    record: [],
    error: null,
    loading: true
  }

  const [state, dispatch] = useReducer(TimeReducer, initialState)

  const setTime = () => {
    const d = new Date()
    const time = d.toLocaleTimeString()

    dispatch({
      type: TIME_NOW,
      payload: time
    })
  }

  const getPublicData = async () => {
    try {
      const res = await axios.get('api/records/all')
      dispatch({
        type: GET_PUBLIC_DATA,
        payload: res.data
      })
    } catch (error) {
      setError(error)
    }
  }

  const getData = async () => {
    try {
      const res = await axios.get('api/records')
      dispatch({
        type: GET_DATA,
        payload: res.data
      })
    } catch (error) {
      setError(error)
    }
  }

  const getSpecificData = async id => {
    try {
      const res = await axios.get(`api/records/${id}`)
      dispatch({
        type: GET_SPECIFIC_DATA,
        payload: res.data
      })
    } catch (error) {
      setError(error)
    }
  }

  // Compute Duration
  const secondCompute = timeDuration => {
    var hms = timeDuration[0] // your input string
    var a = hms.split(':') // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2]
    return seconds
  }

  const addData = async data => {
    // use duration
    const timeIn_duration = state.timeIn.split(' ')
    const timeOut_duration = state.timeOut.split(' ')

    const computed_duration =
      secondCompute(timeOut_duration) - secondCompute(timeIn_duration)

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      data.duration = computed_duration
      const res = await axios.post('/api/records', data, config)

      dispatch({
        type: ADD_DATA,
        payload: res.data
      })
    } catch (err) {
      setError(err)
    }
  }

  const updateData = async data => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put('/api/records', data, config)

      dispatch({
        type: UPDATE_DATA,
        payload: res.data
      })
    } catch (err) {
      setError(err)
    }
  }

  const setError = error => {
    dispatch({
      type: RECORD_ERROR,
      payload: error
    })
  }
  // local store data
  const getLocalData = async () => {
    try {
      const res = await axios.get('/api/autoSave')
      dispatch({
        type: STORE_DATA,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: RECORD_ERROR,
        payload: error
      })
    }
  }
  const setStoreData = async () => {
    try {
      const res = await axios.get('/api/autoSave')
      dispatch({
        type: GET_STORE_DATA,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: RECORD_ERROR,
        payload: error
      })
    }
  }

  //local save data
  const storeData = async data => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/autoSave', data, config)

      dispatch({
        type: STORE_DATA,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: RECORD_ERROR,
        payload: error
      })
    }
  }
  const deleteItem = async id => {
    try {
      await axios.delete(`/api/records/${id}`)
      dispatch({
        type: DELETE_RECORD,
        payload: id
      })
    } catch (error) {
      setError(error)
    }
  }
  const setTimeIn = () => dispatch({ type: GET_TIME_IN, payload: state.time })
  const setTimeOut = () => dispatch({ type: GET_TIME_OUT, payload: state.time })
  const clearAll = () => {
    dispatch({ type: CLEAR_ALL })
  }
  return (
    <TimeContext.Provider
      value={{
        date: state.date,
        time: state.time,
        timeIn: state.timeIn,
        timeOut: state.timeOut,
        collection: state.collection,
        records: state.records,
        record: state.record,
        loading: state.loading,
        bodyA: state.body,
        titleA: state.title,
        privacy: state.privacy,
        setTime,
        setTimeIn,
        setTimeOut,
        storeData,
        clearAll,
        addData,
        getData,
        getSpecificData,
        deleteItem,
        updateData,
        getLocalData,
        setStoreData,
        getPublicData
      }}
    >
      {props.children}
    </TimeContext.Provider>
  )
}

export default TimeState
