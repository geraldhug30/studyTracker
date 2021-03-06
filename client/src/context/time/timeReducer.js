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
  GET_PUBLIC_DATA,
  FILTER_RECORDS,
  CLEAR_FILTER
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case TIME_NOW:
      return {
        ...state,
        time: action.payload
      }
    case GET_TIME_IN:
      return {
        ...state,
        timeIn: action.payload
      }
    case GET_TIME_OUT:
      return {
        ...state,
        timeOut: action.payload
      }

    case STORE_DATA:
      return {
        ...state,
        collection: action.payload
      }
    case GET_STORE_DATA:
      return {
        ...state,
        timeIn: action.payload.timeIn,
        timeOut: action.payload.timeOut
      }
    case GET_PUBLIC_DATA:
      return {
        ...state,
        privacy: action.payload
      }
    case UPDATE_DATA:
      return {
        ...state,
        records: state.records.map(record =>
          record._id === action.payload._id ? action.payload : record
        )
      }
    case GET_DATA:
      return {
        ...state,
        records: action.payload,
        loading: false
      }
    case GET_SPECIFIC_DATA:
      return {
        ...state,
        record: action.payload,
        loading: false
      }
    case ADD_DATA:
      return {
        ...state,
        records: [action.payload, ...state.records]
      }
    case RECORD_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case CLEAR_ALL:
      return {
        ...state,
        timeIn: [],
        timeOut: [],
        record: [],
        collection: []
      }

    case FILTER_RECORDS:
      return {
        ...state,
        filtered: state.records.filter(record => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return record.title.match(regex) || record.privacy.match(regex)
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case DELETE_RECORD:
      return {
        ...state,
        records: state.records.filter(record => record._id === action.payload),
        record: []
      }
    default:
      return state
  }
}
