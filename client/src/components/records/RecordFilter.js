import React, { useEffect, useContext, useRef } from 'react'
import TimeContext from '../../context/time/timeContext'
import { Form } from 'react-bootstrap'

const RecordFilter = () => {
  const timeContext = useContext(TimeContext)
  const text = useRef('')
  const { filterRecord, clearFilter, filtered } = timeContext

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  }, [filtered])
  const onChange = e => {
    if (text.current.value !== '') {
      filterRecord(e.target.value)
    } else {
      clearFilter()
    }
  }
  const onSubmitForm = e => {
    e.preventDefault()
  }
  return (
    <Form.Group
      className='mt-3'
      controlId='formBasicEmail'
      onSubmit={onSubmitForm}
    >
      <Form.Control ref={text} placeholder='Filter Notes' onChange={onChange} />
      <Form.Text className='text-muted'>
        Use the title or privacy type to filter
      </Form.Text>
    </Form.Group>
  )
}

export default RecordFilter
