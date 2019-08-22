import React, { createContext, useContext, useReducer } from 'react';

const TodoContext = createContext();

const initialState = {
  todo: []
}

const reducer = (state, action) => {
  console.log(state, action);

  switch(action.type) {
    case 'ADD':
      return { ...state, todo: [ ...state.todo, { task: action.payload.task, completed: false } ] }
    case 'TOGGLE':
      return { ...state, todo: state.todo.map((todo, index) => {
        if (index === action.payload.index) {
          todo.completed = !todo.completed;
        }
        return todo;
      }) }
    case 'DELETE':
      return { ...state, todo: state.todo.filter((todo, index) => index !== action.payload.index) }
    case 'CLEAR':
      return { todo: [] }
    default:
      return { ...state }
  }
}

export const TodoProvider = ({ children }) => {
  return (
    <TodoContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoState = () => {
  return useContext(TodoContext);
}

