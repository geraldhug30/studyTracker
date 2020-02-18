import React, { Fragment, useState, useContext, useEffect } from 'react'
import TimeContext from '../../context/time/timeContext'
import Alerts from '../layouts/Alerts'
import { Button, ButtonGroup } from 'react-bootstrap'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './CKeditor.css'
const RecordForm = () => {
  const [records, setRecords] = useState({
    title: '',
    timeInV: '',
    timeOutV: '',
    body: ''
  })

  const timeContext = useContext(TimeContext)

  let {
    collection,
    record,
    timeIn,
    timeOut,
    setTimeIn,
    setTimeOut,
    storeData,
    clearAll,
    addData,
    updateData,
    getLocalData,
    setStoreData
  } = timeContext

  let { title, body, timeInV, timeOutV } = records

  useEffect(() => {
    if (collection.length === 0 && record.length === 0) {
      getLocalData()
    } else if (record.length !== 0 && title === '') {
      records.title = record.title
      records.timeInV = record.timeIn
      records.timeOutV = record.timeOut
      records.body = record.body
    } else {
      records.timeInV = timeIn
      records.timeOutV = timeOut
    }

    // eslint-disable-next-line
  }, [record, timeIn, timeOut, records, title, timeInV, timeOutV, collection])

  const onChange = e => {
    setRecords({ ...records, [e.target.name]: e.target.value })
  }

  if (timeIn.length !== 0) {
    storeData({
      title,
      body,
      timeIn: records.timeInV
    })
  }

  const restoreData = () => {
    setStoreData()
    records.title = collection.title
    records.body = collection.body
  }

  const onSubmit = e => {
    e.preventDefault()

    if (body === '' || title === '' || timeIn === '' || timeOut === '') {
      console.log('body and title needed')
    }

    const data = {
      title,
      body,
      timeIn,
      timeOut
    }

    if (record.length !== 0) {
      // only body and title will be updated
      record.title = records.title
      record.body = records.body
      updateData(record)
    } else {
      addData(data)
    }

    clearTime()
  }
  const clearTime = () => {
    setRecords({ title: '', timeInV: '', timeOutV: '', body: '' })
    clearAll()
  }

  return (
    <Fragment>
      <Alerts />
      {record.length !== 0 && <h3 style={{ color: 'red' }}>Edit Record</h3>}
      <form onSubmit={onSubmit} className='main-form' autoComplete='off'>
        <label htmlFor='inputEnd'>Title: </label>
        <input
          id='title'
          className='form-control text-center'
          type='text'
          name='title'
          value={title}
          onChange={onChange}
          required
        />
        <label htmlFor='inputStart'>Time Start:</label>
        <input
          id='inputStart'
          className='form-control text-center text-success'
          type='text'
          name='timeInV'
          value={timeInV}
          readOnly
        />
        <label htmlFor='inputEnd'>Time End:</label>
        <input
          id='inputEnd'
          className='form-control text-center text-danger'
          name='timeOutV'
          type='text'
          value={timeOutV}
          readOnly
        />

        <label htmlFor='inputComment'>Notes:</label>
        <CKEditor
          editor={ClassicEditor}
          data={body}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor)
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            records.body = data
          }}
        />

        <div className='d-flex flex-column'>
          {record.length === 0 ? (
            <ButtonGroup className='m-3'>
              {timeIn.length === 0 ? (
                <Fragment>
                  <Button className='btn-success' onClick={setTimeIn}>
                    Start
                  </Button>
                  {collection.length !== 0 && (
                    <Button className='btn-primary' onClick={restoreData}>
                      Restore
                    </Button>
                  )}
                </Fragment>
              ) : (
                <Button className='btn-danger' onClick={setTimeOut}>
                  Stop
                </Button>
              )}
              {timeIn.length !== 0 && (
                <Button type='submit' onClick={clearTime} className='btn-dark'>
                  Clear
                </Button>
              )}
              {timeIn.length !== 0 && timeOut.length !== 0 && (
                <Button type='submit' className='btn-primary'>
                  Submit
                </Button>
              )}
            </ButtonGroup>
          ) : (
            <ButtonGroup className='m-3'>
              <Button type='submit' onClick={clearTime} className='btn-dark'>
                Clear
              </Button>
              <Button type='submit' className='btn-primary'>
                Update Input
              </Button>
            </ButtonGroup>
          )}
        </div>
      </form>
    </Fragment>
  )
}

export default RecordForm
