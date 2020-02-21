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
    privacy: 'public',
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

  let { title, body, timeInV, timeOutV, privacy } = records

  useEffect(() => {
    if (collection.length === 0 && record.length === 0) {
      // get autoSave data and put it on collection contexts
      getLocalData()
    } else if (record.length !== 0 && title === '') {
      // for editing
      records.title = record.title
      records.timeInV = record.timeIn
      records.timeOutV = record.timeOut
      records.body = record.body
      records.privacy = record.privacy
    } else {
      records.timeInV = timeIn
      records.timeOutV = timeOut
      records.privacy = privacy
    }

    // eslint-disable-next-line
  }, [
    record,
    timeIn,
    timeOut,
    records,
    title,
    timeInV,
    timeOutV,
    collection,
    privacy
  ])

  const onChange = e => {
    setRecords({ ...records, [e.target.name]: e.target.value })
  }

  if (timeIn.length !== 0 && timeOut.length === 0) {
    // store data from autosave data
    storeData({
      title,
      body,
      timeIn,
      timeOut: '',
      privacy
    })
  } else if (timeIn.length !== 0 && timeOut.length !== 0) {
    storeData({
      title,
      body,
      timeIn,
      timeOut,
      privacy
    })
  }

  const restoreData = () => {
    setStoreData()
    records.title = collection.title
    records.body = collection.body
    records.privacy = collection.privacy
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
      timeOut,
      privacy
    }

    if (record.length !== 0) {
      // only body and title will be updated
      record.title = records.title
      record.body = records.body
      record.privacy = records.privacy
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

  const onSiteChanged = e => {
    records.privacy = e.target.value
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
        <p style={{ padding: '3%' }}>
          <input
            type='radio'
            name='privacy'
            id='public'
            value='public'
            onChange={onSiteChanged}
            checked={privacy === 'public'}
          />
          <label htmlFor='public' className='mr-3'>
            {' '}
            Public
          </label>

          <input
            type='radio'
            name='privacy'
            id='private'
            value='private'
            checked={privacy === 'private'}
            onChange={onSiteChanged}
          />
          <label htmlFor='private'> Private</label>
        </p>

        <label htmlFor='inputComment'> Notes:</label>
        <CKEditor
          editor={ClassicEditor}
          data={body}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
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
                    <i class='fas fa-play'></i>
                  </Button>
                  {collection.length !== 0 && (
                    <Button className='btn-primary' onClick={restoreData}>
                      <i class='fas fa-hourglass-start'></i>
                    </Button>
                  )}
                </Fragment>
              ) : (
                <Button className='btn-danger' onClick={setTimeOut}>
                  <i class='fas fa-stop '></i>
                </Button>
              )}
              {timeIn.length !== 0 && (
                <Button type='submit' onClick={clearTime} className='btn-dark'>
                  <i class='fas fa-trash-alt'></i>
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
