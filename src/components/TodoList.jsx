import React from 'react'

const todos = [
    'Uma tarefa',
    'Outra tarefa'
]

export function TodoList() {
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text"/>
        </form>
        <ul>
            {todos.map((todo, index) => (
                <li key={index}>{todo}</li>
            ))}
        </ul>
    </div>
}