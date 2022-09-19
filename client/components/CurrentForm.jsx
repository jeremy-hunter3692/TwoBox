import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTodaysFormData, getTodaysFormData } from '../Actions/formActions'

export default function CurrentForm(props) {
  useEffect(() => {
    dispatch(getTodaysFormData())
  }, [])

  const initCurrentForm = useSelector((state) => state.formData)
  const [form, setForm] = useState(initCurrentForm)
  const dispatch = useDispatch()
  const { studentNotes } = form
  // console.log('2', form)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    dispatch(setTodaysFormData({ ...form, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // dispatch(setTodaysFormData(form))
  }

  return (
    <div className="notesInput">
      <form onSubmit={handleSubmit}>
        <label htmlFor={props.title}>
          <h1>
            <strong>
              {props.title}
              {/* {data.submitted} */}
            </strong>
          </h1>
        </label>

        <div>
          <input className="clickMe" type="submit" value="submit all notes" />
        </div>

        <textarea
          className="textBox"
          type="text"
          id={props.title}
          name="studentNotes"
          value={studentNotes}
          onChange={handleChange}
          size="sm"
        ></textarea>
      </form>
    </div>
  )
}

{
  /* TODO implement clear buttone <button
className="clickMe"
onClick={(e) => {
  e.preventDefault()
  // setData(initialData)
}}
>
Clear text
</button> */
}
