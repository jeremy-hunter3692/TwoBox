import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { addEvents } from '../Actions/eventsActions'
import { getSessions } from '../sessionsAPI'

// import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)
// const initEvent = [
//   {
//     start: ' ',
//     end: ' ',
//     title: 'init ',
//   },
// ]

export default function MyCalendar({ student, noOfWeeks }) {
  const dispatch = useDispatch()
  const eventData = useSelector((state) => state.events)
  // console.log('1', student)
  const [events, setEvents] = useState([])
  const [newEvents, setNewEvents] = useState([])

  useEffect(() => {
    eventData[0] ? setEvents(eventData) : setEvents([])
  }, [])

  function createWeeklyEvent(newEvent, length) {
    console.log('length', length, 'event', newEvent)
    const weeklyEvents = [newEvent]
    for (let i = 1; i < length; i++) {
      let newDate = {
        ...newEvent,
        start: new Date(weeklyEvents[i - 1].start.valueOf()),
        end: new Date(weeklyEvents[i - 1].end.valueOf()),
      }
      newDate.start.setDate(newDate.start.getDate() + 7)
      newDate.end.setDate(newDate.end.getDate() + 7)
      // newDate.setDate(newDate.getDate() + 7)
      // console.log('current date', i, newDate)
      weeklyEvents.push(newDate)
    }
    console.log('arr', weeklyEvents)
    return weeklyEvents
  }

  function handleSelect(start, end) {
    console.log('onselecetedslot')
    addEvent(start, end)
  }

  function addEvent({ start, end }) {
    let length = noOfWeeks
    let title = student.name
    //TODO get teacher id on load?
    let teacher = 4
    // imrpove this logic/defnsive stuff
    if (title != ' ') {
      let newEvent = {
        start: start,
        end: end,
        title: title,
        studentNotes: '',
        teacherNotes: '',
        studentId: student.id,
        teacherId: teacher,
      }

      let newEventsArr = createWeeklyEvent(newEvent, length || 0)
      setNewEvents(newEventsArr)
      // dispatch(addEvents(resultArr))
      setEvents([...events, newEvent])
    }
  }

  //save on navigate away??
  function submit() {
    console.log('submit', newEvents)
    dispatch(addEvents(newEvents))
  }

  return (
    <div>
      <h1>Calender</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView={Views.DAY}
        selectable={true}
        onSelectSlot={handleSelect}
        longPressThreshold={10}
      />
      <button onClick={submit}>submit events</button>
    </div>
  )
}
