'use client';
import React, { useEffect, useRef, useState } from 'react'
import { db } from './firebaseConfig';
import { collection, getDocs, updateDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isInfoEditable, setIsInfoEditable] = useState(false);
  const titleRef = useRef();
  const infoRef = useRef();

  const deleteTodo = async (id) => {
    try {
      const todoRef = doc(db, "todos", id);
      await deleteDoc(todoRef);
    } catch (err) {
      console.error("Error deleting document: ", err);
    }
  };

  const updateTodoTitle = async (id, title) => {
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, {title});
    } catch (err) {
      throw err;
      // console.error("Error updating todo title: ", err);
    }
  };
  const updateTodoInfo = async (id, info) => {
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, {info});
    } catch (err) {
      console.error("Error updating todo info: ", err);
    }
  };

  useEffect(() => {
    // Realtime
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const todosFromDB = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTodos(todosFromDB);
    });

    return () => unsubscribe();

    // Not realtime
    // const getTodos = async () => {
    //   const querySnapshot = await getDocs(collection(db, "todos"));
    //   const todosFromDB = [];
    //   querySnapshot.forEach((doc) => {
    //     todosFromDB.push({id: doc.id, ...doc.data()});
    //     // console.log(`${doc.id} => ${doc.data()}`);
    //   });
    //   setTodos(todosFromDB);
    // };

    // getTodos();
  }, []);

  return (
    <ul className='flex flex-col w-screen p-8'>{todos.map(todo =>
      <li className='w-full bg-slate-800 hover:bg-slate-900 text-white m-2 p-4' key={todo.id}>
        
        {/* Task Title */}
        <input
          type="text"
          value={todo.title}
          className="rounded bg-slate-700 text-xl w-full p-4 mb-2 cursor-pointer transition-colors"
          readOnly={!isTitleEditable}
          onClick={e => setIsTitleEditable(true)}
          onChange={async e => {
            await updateTodoTitle(todo.id, e.target.value);
            setIsTitleEditable(false);
          }}
          onBlur={async e => {}}/>

        {/* Task Info */}
        <input
          type="text"
          value={todo.info}
          className='rounded bg-slate-700 text-md w-full p-2 mb-2 cursor-pointer transition-colors'
          readOnly={!isInfoEditable}
          onClick={e => setIsInfoEditable(true)}
          onChange={async e => {
            await updateTodoInfo(todo.id, e.target.value);
            setIsInfoEditable(false);
          }}/>

        {/* Delete Task */}
        <button onClick={e => deleteTodo(todo.id)}>Delete</button>
      </li>
    )}</ul>
  )
}
