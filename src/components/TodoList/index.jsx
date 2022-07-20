import React, { useState } from 'react'
import { generateID } from "../../utils/generateID";
import './style.css'

const filterType = {
  all: 'ALL_TASKS',
  done: 'DONE_TASKS',
  pending: 'PENDING_TASKS'
}

const statusType = {
  done: 'DONE',
  pending: 'PENDING'
}

function getNextStatus(currentStatus) {
  return currentStatus === statusType.done
    ? statusType.pending
    : statusType.done
}

const initialTasks = [
  { name: 'comer chocolate', status: statusType.pending, id: generateID()},
  { name: 'velejar', status: statusType.pending, id: generateID()},
  { name: 'tomar banho', status: statusType.pending, id: generateID()},
  { name: 'varrer a casa', status: statusType.pending, id: generateID()},
  { name: 'preparar almoço', status: statusType.pending, id: generateID()},
]

export function TodoList() {
  const [tasks, setTasks] = useState(initialTasks)
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState(filterType.all)

  const handleInputChange = (ev) => setInputValue(ev.currentTarget.value.trim())
  const handleSubmit = (event) => {
    event.preventDefault()
    if (inputValue === '') return
    const newTask = {
      name: inputValue,
      status: statusType.pending,
      id: generateID()
    }
    setTasks([...tasks, newTask])
    setInputValue('')
  }
  const toggleTaskStatus = (clickedTask) => {
    const index = tasks.findIndex(task => task.id === clickedTask.id)
    const task = tasks[index]
    setTasks([
      ...tasks.slice(0, index),
      {
        ...task,
        status: getNextStatus(task.status)
      },
      ...tasks.slice(index + 1)
    ])
  };

  const validateTaskStatus = (task) => {
    switch (filter) {
      case filterType.all:
        return true
      case filterType.done:
        return task.status === statusType.done
      case filterType.pending:
        return task.status === statusType.pending
      default:
        throw new Error('Unknown state for task filter')
    }
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <input value={inputValue} onChange={handleInputChange} type="text" />
    </form>
    <button onClick={() => setFilter(filterType.all)}>All tasks</button>
    <button onClick={() => setFilter(filterType.done)}>Done</button>
    <button onClick={() => setFilter(filterType.pending)}>Pending</button>
    <ul>
      {tasks.filter(validateTaskStatus).map((task) => (
        <li
          onClick={() => toggleTaskStatus(task)}
          className={task.status === statusType.done ? 'done-task' : ''}
          key={task.id}
        >
          {task.name}
        </li>
      ))}
    </ul>
  </div>
}