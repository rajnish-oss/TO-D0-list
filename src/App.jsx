import { useState,useEffect,useRef } from 'react';
import Navbar from './Navbar.jsx';
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [task,setTask] = useState("");
  const [todos,setTodos] = useState([]);
  const inputRef = useRef("");

  const saveToLS = () =>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  useEffect(()=>{
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos || [])
  },[])

  const addtask = (e) =>{
   setTask(e.target.value)
  }

  const handleAdd = () =>{
    setTodos([...todos,{id:uuidv4(),task,iscomplete : false}]);
    setTask('');
    saveToLS();
  }

  const deleteTask = (e,id) =>{
    let newTodos = todos.filter((item)=>{
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS();
  }

  const handleEdit = (e,id) => {
    let t = todos.filter((item)=>{
      return item.id === id;
    })
    setTask(t[0].task)
    let newTodos = todos.filter((item)=>{
      return item.id !== id;
    })
    setTodos(newTodos);
    inputRef.current.focus()
    saveToLS();
  }

  const handleCheckbox = (e) =>{
    let id = e.target.name;
    let index = todos.findIndex((item)=>{
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }

  return (
    <>
     <Navbar/>
     <div className="grid justify-center w-full h-20vh fixed top-48" onKeyDown={(e)=>{e.key === 'Enter' && task.length !== 0 && handleAdd()}}>
     <div className="inputArea h-auto">
      <input className='input w-[33vw] h-8 rounded-xl border-0 outline-0 pl-2' ref={inputRef}  type="text" value={task} onChange={addtask} placeholder='enter text here'/>
     <button className=' bg-blue-950 h-8 rounded-xl w-14 text-zinc-300' onClick={handleAdd}>add</button>
     </div> 
      <div className="taskArea grid my-4  w-[38vw] ml-4 h-auto">
        {todos.map((item)=>(
        <div key={item.id} className="flex w-20vw mb-4 items-center align-center">
          <input type="checkbox" name={item.id} className="mx-2" onChange={handleCheckbox}/>
        <div className={item.isCompleted?"line-through":"text"}>{item.task}</div>
        <div className="buttons absolute ml-[28vw] ">
          <button className='done bg-green-700 h-8 w-12 rounded-lg text-zinc-300' onClick={(e)=>{handleEdit(e,item.id)}}>edit</button>
          <button className='delete bg-red-800 h-8 w-14 rounded-lg ml-2 text-zinc-300' onClick={(e)=>{deleteTask(e,item.id)}}>delete</button>
        </div>
        </div>
        ))}
      </div>
     </div>

    </>
  )

}

export default App
