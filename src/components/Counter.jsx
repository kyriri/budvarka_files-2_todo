import React from 'react'

export function Counter({initialCount = 0}) {
    const [count, setCount] = React.useState(initialCount)
    const handleIncrement = () => setCount(count + 1)
    const handleDrecement = () => setCount(count - 1)
    return <div>
        <button onClick={handleIncrement}>+</button>
        <span>{count}</span>
        <button onClick={handleDrecement}>-</button>
    </div>
}