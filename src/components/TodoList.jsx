import React, { useState } from 'react'

const initialTasks = [
  {
    name: 'comer chocolate',
    isDone: true,
  },
  {
    name: 'velejar',
    isDone: false,
  },
]

export function TodoList() {
  const [tasks, setTasks] = useState(initialTasks)
  const handleSubmit = (event) => {
    event.preventDefault()
    if (inputValue === '') return
    setTasks([...tasks, {
      name: inputValue,
      isDone: false,
    }])
    setInputValue('')
  }
  const handleInputChange = (ev) => setInputValue(ev.currentTarget.value.trim())
  const [inputValue, setInputValue] = useState('')


  return <div>
    <form onSubmit={handleSubmit}>
      <input value={inputValue} onChange={handleInputChange} type="text" />
    </form>
    <ul>
      {tasks.map((task, index) => <li key={index}>{task.name}</li>)}
    </ul>
  </div>
}