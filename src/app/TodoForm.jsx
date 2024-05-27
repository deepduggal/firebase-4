'use client';
import React, { useState } from 'react'
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function TodoForm() {
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');

  function clearForm() {
    setTitle('');
    setInfo('');
  }

  async function addTodo(todo) {
    try {
      const docRef = await addDoc(collection(db, "todos"), todo);
      console.log("Document written with ID: ", docRef.id);
    }
    catch (err) {
      console.error('Failed to add Todo', err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const todo = { title, info };
    addTodo(todo);
    clearForm();
  }


  return (
    <div>
      <form className="flex items-center justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-2 text-black"
          placeholder="Add a task"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 ml-2">
          Add
        </button>
      </form>
    </div>
  )
}
