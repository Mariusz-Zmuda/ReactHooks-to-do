import React, { useState } from "react";
import "./App.css";

// Two functions (functional components): TodoForm and App
// create component that will be returned later (App function)
// "todo" will show todo.text 's text part

// (param1, param2, …, paramN) => { statements }
// (param1, param2, …, paramN) => expression
// equivalent to:  => { return expression; }

// CRUD function here

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.itemCompleted ? "line-through" : "" }}>
      {todo.text}

      <div className="button">
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}
// Form's input field starts with an empty state.
// Form can be UPDATED by setting the state
// Form needs to handleSubmit

// in dev mode F12 > components > hooks 
// when you type in the form new item, the state changes automatically to what is being typed

// functional component
// [value, setValue] 
// [name state, how can you set the state]

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

// e = event

//  handleSubmit handles addTodo after pressing "enter": 
// adding item or do nothing if input field is empty 
// after adding there will be a new empty field 

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

// functional component
// [todos, setTodos] 
// [name state, what is used to set the state]

function App() {
  const [todos, setTodos] = useState([
    { text: "Very important thing to do!",
      itemCompleted: false },
    { text: "Improve React Hooks skills.",
      itemCompleted: false },
    { text: "Push more code to GithHub.",
      itemCompleted: false }
  ]);

// no "this.state", with React Hooks shorter code
// Spread operator ... to copy our array of items and add new item
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].itemCompleted = true;
    setTodos(newTodos);
  };
  
  const removeTodo = index => {
    const newTodos = [...todos];
    // Remove 1 element at index 3; .splice(3, 1)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice#remove_1_element_at_index_3
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

// map() to create new array of todo items
// display by array index (F12 in Chrome and select Components)

// https://reactjs.org/docs/lists-and-keys.html
// Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

  return (
    
    <div className="app">

      <div className="hello">
          <h2>React To-do app.</h2>
      </div>

      <div className="instruction">
          <h4>Type a new note in the input field and press 'Enter'.</h4>
      </div>     

      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );

  
}
  export default App;
