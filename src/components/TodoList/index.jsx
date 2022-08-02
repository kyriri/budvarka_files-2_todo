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

const initialTasks = [
  { name: 'eat chocolate', status: statusType.pending, id: generateID() },
  { name: 'go sailing', status: statusType.pending, id: generateID() },
  { name: 'have dinner', status: statusType.done, id: generateID() },
  { name: 'sleep 8h', status: statusType.pending, id: generateID() },
  { name: 'make coffee', status: statusType.pending, id: generateID() },
]

function getNextStatus(currentStatus) {
  return currentStatus === statusType.done
    ? statusType.pending
    : statusType.done
}

export function TodoList() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState(filterType.all)

  const addTask = (name) => {
    const newTask = {
      name,
      status: statusType.pending,
      id: generateID()
    }
    setTasks([...tasks, newTask])
  }

  const addTaskAndUpdateView = (text) => {
    addTask(text)
    if (filter === filterType.done) {
      setFilter(filterType.all)
    }
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

  const deleteTask = (clickedTask) => {
    const index = tasks.findIndex(task => task.id === clickedTask.id)
    setTasks([
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1)
    ])
  }

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
      <NewTodoListTaskForm onInput={addTaskAndUpdateView}/>
    </div>
    <div className='filters-area'>
      <FilterButton active={filter === filterType.all} type={filterType.all} onClick={setFilter}>
        All Tasks
      </FilterButton>
      <FilterButton active={filter === filterType.done} type={filterType.done} onClick={setFilter}>
        Done
      </FilterButton>
      <FilterButton active={filter === filterType.pending} type={filterType.pending} onClick={setFilter}>
        Pending
      </FilterButton>
    </div>
    <div className='tasks-area'>
      <ul>
        {tasks.filter(validateTaskStatus).map((task) => (
          <TodoListITem
            item={task}
            onTextClick={toggleTaskStatus}
            onTrashClick={deleteTask}
            key={task.id}
          />
        ))}
      </ul>
    </div>
  </article>
}

function NewTodoListTaskForm({onInput}) {
  const [inputValue, setInputValue] = useState('')
  const handleInputChange = (ev) => setInputValue(ev.currentTarget.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedInput = inputValue.trim()
    if (trimmedInput === '') {
      setInputValue('')
      return
    }
    onInput(trimmedInput)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='new-task'>Add new task: </label>
      <input id='new-task' value={inputValue} onChange={handleInputChange} type='text' />
    </form>
  )
}

function TodoListITem({ item, onTextClick, onTrashClick }) {
  const handleTextClick = () => onTextClick(item)
  const handleTrashClick = () => onTrashClick(item)
  return (
    <li>
      <div>•</div>
      <div
        onClick={handleTextClick}
        className={item.status === statusType.done ? 'done-task' : ''}
      >
        {item.name}
      </div>
      <div onClick={handleTrashClick}><img className='trash-can' src='icon-trash-can.png' alt='An image of trash can that, when clicked, deletes the task besides it'/></div>
    </li>
  )
}

function FilterButton({ type = filterType.all, active, onClick, children }) {
  return (
    <button
      onClick={() => onClick(type)}
      className={active ? 'active' : undefined}
    >
      {children}
    </button>
  )
}