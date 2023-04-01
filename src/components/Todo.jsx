import React from 'react';
import {FaRegTrashAlt} from 'react-icons/fa'

const style = {
    li: `flex justify-between bg-slate-200 my-2 capitalize p-4`,
    liComplete: `flex justify-between bg-slate-400 my-2 capitalize p-4`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`
}

const Todo = ({todo, toggleComplete, deleteTodo}) => {
    return (
        <li className={todo.completed? style.liComplete : style.li}> 
            <div 
                className={style.row} 
                onClick={()=>{
                    toggleComplete(todo);
                }}
            >
                <input 
                    type="checkbox" 
                    name="" 
                    id="" 
                    defaultChecked={todo.completed}
                />
                <p className={todo.completed? style.textComplete : style.text}>{todo.text}</p>
            </div>
            <button 
                className={style.button}
                onClick={()=>{
                    deleteTodo(todo)
                }}
            ><FaRegTrashAlt></FaRegTrashAlt></button>
        </li>
    );
};

export default Todo;