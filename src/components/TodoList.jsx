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
  const DoneTaskStyle = {textDecoration: 'line-through'}
  const [tasks, setTasks] = useState(initialTasks)
  const [inputValue, setInputValue] = useState('')
  
  const handleInputChange = (ev) => setInputValue(ev.currentTarget.value.trim())
  const handleSubmit = (event) => {
    event.preventDefault()
    if (inputValue === '') return
    setTasks([...tasks, {
      name: inputValue,
      isDone: false,
    }])
    setInputValue('')
  }
  const handleClickOnTask = (clickedTask) => {
    // the logic below presents an issue if there are 2 tasks with the same name
    let index = tasks.findIndex(task => task.name === clickedTask.name)
    let nextTasks = [...tasks]
    nextTasks[index].isDone = !tasks[index].isDone
    setTasks(nextTasks)
  };

  return <div>
    <form onSubmit={handleSubmit}>
      <input value={inputValue} onChange={handleInputChange} type="text" />
    </form>
    <ul>
      {tasks.map((task, index) => <li onClick={() => handleClickOnTask(task)} style={task.isDone ? DoneTaskStyle : {}} key={index}>{task.name}</li>)}
    </ul>
  </div>
}