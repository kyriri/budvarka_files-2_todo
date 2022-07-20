import React, { useState } from 'react'

const initialTasks = [
  { name: 'comer chocolate', isDone: true},
  { name: 'velejar', isDone: false},
  { name: 'tomar banho', isDone: false},
  { name: 'varrer a casa', isDone: true},
  { name: 'preparar almoço', isDone: false},
]

export function TodoList() {
  const DoneTaskStyle = {textDecoration: 'line-through'}
  const [tasks, setTasks] = useState(initialTasks)
  const [inputValue, setInputValue] = useState('')
  const [tasksToShow, setTasksToShow] = useState(initialTasks)
  
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

  const handleTaskFilters = (ev) => {
    if (ev.target.id === 'done_tasks') setTasksToShow(tasks.filter(item => item.isDone))
    if (ev.target.id === 'pending_tasks') setTasksToShow(tasks.filter(item => !item.isDone))
    if (ev.target.id === 'all_tasks') setTasksToShow(tasks)
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <input value={inputValue} onChange={handleInputChange} type="text" />
    </form>
    <br />
    <button onClick={handleTaskFilters} id='all_tasks'>All tasks</button>
    <button onClick={handleTaskFilters} id='done_tasks'>Done</button>
    <button onClick={handleTaskFilters} id='pending_tasks'>Pending</button>
    <ul>
      {tasksToShow.map((task, index) => <li onClick={() => handleClickOnTask(task)} style={task.isDone ? DoneTaskStyle : {}} key={index}>{task.name}</li>)}
    </ul>
  </div>
}