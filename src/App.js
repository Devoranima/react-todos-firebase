import React, { useState, useEffect } from "react";
import {AiOutlinePlus} from "react-icons/ai";
import Todo from "./components/Todo";

import {db} from "./firebase.js"
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";



const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-600 text-slate-100`,
  count: `text-center p-2`,
}

function App() {


  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')


  //create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert("Enter a valid value for a todo text")
      return;
    }

    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    })
    .then(setInput(''))

  }


  //read todo from firebase
  useEffect(()=>{
    const q = query(collection(db, "todos"))
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todoAr = [];
      QuerySnapshot.forEach((doc)=>{
        todoAr.push({...doc.data(), id: doc.id})
      })
      setTodos(todoAr)
    })
    return ()=> unsubscribe()
  }, [])

  //update todo in firebase

  async function toggleComplete (todo){
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }


  //delete todo

  const deleteTodo = async (todo) => {
    await deleteDoc(doc(db, 'todos', todo.id))
  }


  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>ToDo</h3>
        <form 
          onSubmit={(e)=>{createTodo(e)}} 
          className={style.form}
        >
          <input 
            className={style.input} 
            type="text" 
            placeholder="Add ToDo"
            value={input}
            onChange={(e)=>{
              setInput(e.target.value)
            }}
          />
          <button className={style.button}><AiOutlinePlus size={30}/></button>
        </form>

        <ul>
          {todos.map((e, index)=> <Todo key={index} todo={e} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>)}
        </ul>

        {
          todos.length > 0 && 
          <p className={style.count}>
            You have {todos.length} todos
          </p>
        }
      </div>
    </div>
  );
}

export default App;
