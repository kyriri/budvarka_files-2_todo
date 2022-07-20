import React from 'react'
import ReactDOM from 'react-dom/client'
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
      {/* <Counter initialCount={0}/> */}
      <TodoList/>
  </React.StrictMode>
)
