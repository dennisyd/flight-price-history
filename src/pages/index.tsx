import { NextPage } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { createTodo, deleteTodo, toggleTodo, useTodos } from '../api';
import { Todo } from '../types';

export const TodoList: React.FC = () => {
  const { data: todos, error } = useTodos();

  if (error != null) return <div>Error loading todos...</div>;
  if (todos == null) return <div>Loading...</div>;

  if (todos.length === 0) {
    return <div>Try adding a todo ☝️️</div>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </ul>
  );
};

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => (
  <li>
    <label>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo)}
      />
      {todo.text}
    </label>

    <button onClick={() => deleteTodo(todo.id)}>✕</button>
  </li>
);

const AddTodoInput = () => {
  const [text, setText] = useState('');

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        createTodo(text);
        setText('');
      }}
    >
      <input
        placeholder="Buy some milk"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Railway NextJS Prisma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Hello Worldgvhj</h1>
        <h2>
          NextJS app connected to Postgres using Prisma and hosted on{' '}
          <a href="https://railway.app">Railway</a>
        </h2>
      </header>

      <main>
        <AddTodoInput />

        <TodoList />
      </main>
    </div>
  );
};

export default Home;
