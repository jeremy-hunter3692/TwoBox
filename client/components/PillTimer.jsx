import React, { useState } from 'react'
import moment from 'moment'

export default function PillTimer() {
  const [log, setLog] = useState({})
  const [alreadyAdded, setAdded] = useState(null)
  const [pillName, setPillName] = useState(['Tramadol', 'Panadol', 'Ibuprofen'])
  const [displayPillName, setDisplay] = useState()
  const [form, setForm] = useState('')
  console.log('init', log)

  //adding time pill is taken
  function addPillTime(selectedPillName) {
    //will doing this in two places cause problems?
    let nowString = moment().calendar()
    let currentIndex = null
    {
      //checking if array alreqdy exists in state
      if (log[selectedPillName] === undefined) {
        setLog({ ...log, [selectedPillName]: [nowString] })
      } else {
        currentIndex = pillName.indexOf(selectedPillName)
        //call function for preventing double ups
        if (doubleTimeCheck(selectedPillName, nowString)) {
          setAdded(nowString)
          setDisplay(pillName[currentIndex])
        } else {
          let tempArr = log[selectedPillName]
          tempArr.push(nowString)
          setLog({ ...log, [selectedPillName]: tempArr })
        }
      }
    }
  }

  function deleteButton(x, selectedPillName) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          handleDelete(x, selectedPillName)
        }}
      >
        delete
      </button>
    )
  }

  function generatePillTitles(selectedPillName) {
    return (
      <>
        <h1>You took {selectedPillName} at </h1>
        <button
          key={selectedPillName}
          className="clickMe"
          onClick={(e) => {
            e.preventDefault()
            addPillTime(selectedPillName)
          }}
        >
          Enter new {selectedPillName}
        </button>
        {generateTimeList(selectedPillName)}
      </>
    )
  }
  //time pill taken
  function generateTimeList(pill) {
    return (
      <ul>
        {log[pill]?.map((x) => (
          <li key={x}>
            {x}
            {deleteButton(x, pill)}
          </li>
        ))}
      </ul>
    )
  }

  function doubleTimeCheck(selectedPillName, nowString) {
    let index = log[selectedPillName].length - 1
    return nowString === log[selectedPillName][index] ? true : false
  }

  function handleDelete(time, selectedPillName) {
    let tempArr = log[selectedPillName].filter((x) => x !== time)
    setLog({ ...log, [selectedPillName]: tempArr })
    setAdded(null)
  }

  //form stuff
  function addNewPill(e) {
    e.preventDefault()
    setPillName([...pillName, form])
    setForm('')
  }

  function handleChange(e) {
    setForm(e.target.value)
  }

  
  return (
    <>
      <form onSubmit={addNewPill}>
        <input
          name="addNewPill"
          type="text"
          value={form}
          onChange={handleChange}
        />
        <button onSubmit={addNewPill}>Save New Pill</button>
      </form>

      <div>
        {pillName.map((x) => {
          return generatePillTitles(x)
        })}
      </div>
      {alreadyAdded ? (
        <h3>
          {displayPillName} {alreadyAdded} already saved
        </h3>
      ) : (
        ''
      )}
    </>
  )
}
//TO DO: TIDY UP CONSOLE LOGS
//CLEAR FORM - REACT FORMS
