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
  { name: 'tomar banho', status: statusType.done, id: generateID()},
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
    setFilter(filterType.pending)
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

  return <article>
    <div className='input-area'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='new-task'>Add new task (no spaces allowed): </label>
        <input id='new-task' value={inputValue} onChange={handleInputChange} type='text' />
      </form>
    </div>
    <div className='filters-area'>
      <button 
        onClick={() => setFilter(filterType.all)}
        className={filter === filterType.all ? 'active' : undefined }
      >
        All tasks
      </button>
      <button 
        onClick={() => setFilter(filterType.done)}
        className={filter === filterType.done ? 'active' : undefined }
      >
        Done
      </button>
      <button 
        onClick={() => setFilter(filterType.pending)}
        className={filter === filterType.pending ? 'active' : undefined }
      >
        Pending
      </button>
    </div>
    <div className='tasks-area'>
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
  </article>
}