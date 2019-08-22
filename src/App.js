import React, { useRef } from 'react';

import styled from 'styled-components';
import { useTodoState } from './store';

const Container = styled.div`
  padding: 10px;
`;

const Task = styled.span`
  text-decoration: ${props => props.completed ? 'line-through' : 'none' };
`;

const App = () => {
  const task = useRef(null)
  const [state, dispatch] = useTodoState();
  return (
    <>
      <Container>
        <h1>TODO</h1>
        <input type="text" ref={task} />
        <button onClick={() => {
          dispatch({ type: 'ADD', payload: { task: task.current.value }});
          task.current.value = '';
        }}>add</button>
        <button onClick={() => dispatch({ type: 'CLEAR' })}>all clear</button>
        {state.todo.map((todo, index) => (
          <div key={index}>
            <Task completed={todo.completed}>{todo.task}</Task>
            <input type="checkbox" checked={todo.completed} onChange={() => dispatch({ type: 'TOGGLE', payload: { index } })} />
            <button onClick={() => dispatch({ type: 'DELETE', payload: { index }})}>delete</button>
          </div>
        ))}
      </Container>
    </>
  )
}

export default App;
