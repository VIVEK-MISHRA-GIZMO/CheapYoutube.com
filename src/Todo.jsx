import React, { useEffect, useState } from 'react'
// import todo from "./todo.png"
import './Todo.css'
import {AiOutlinePlus} from 'react-icons/ai'
import {MdOutlineCancel} from 'react-icons/md'

const getLocalData=()=>{
  const list=localStorage.getItem("mytodos")
  
  if(!list)
  {
    return [];
  }
  else{
  return JSON.parse(list)}

}
const Todo = () => {

  const [todo,setTodo]=useState()
  const[items,setItems]=useState(getLocalData())
  const[show,setShow]=useState(false)
 
  
  const AddTodoHandler=()=>{
  if(!todo)
  {
    alert("Todo Can't be blank")
  }
  else{
    const newdata=
      {
        id:new Date().getTime().toString(),
        Name:todo
      }
    
    setItems([...items,newdata])
    setShow(true)
    setTodo(true)
    }
  }
  
  
 

  const deleteItem=(ID)=>{
//  console.log(ID)
  const updatedItems=  items.filter((currentElement)=>{
    console.log(currentElement.id)
    if(currentElement.id!==ID)
    
      return currentElement
    })
    // console.log(updatedItems)
    setItems(updatedItems )
  }

  function deleteAllHadler(){
    setItems([])
    setShow(false)

  }
  useEffect(()=>{
    localStorage.setItem('mytodos',JSON.stringify(items))
  },[items])
  return (
    <div className='main-div'>
      <div className='Todos-title'>
       <h1>Create Your Todos</h1> 
      </div>
      <div className='Input-Field'>
        <input type="text" placeholder='Enter your Todo' value={todo} onChange={(e)=>{setTodo(e.target.value)}} />
        <button className='button' onClick={AddTodoHandler}><AiOutlinePlus style={{fontSize:'1.5rem' ,fontWeight:'bold'}}/></button>
        
      </div>

{items.map((currElement,index)=>{
 
  return(
  <div className='Todos-List' key={currElement.id}>
       
        <div className='todo-item'><span>{index+1}: </span>{currElement.Name}</div>
      
        <div className onClick={()=>deleteItem(currElement.id)} ><MdOutlineCancel style={{color:'black',fontSize:'1.5rem' ,cursor:"pointer"}}/></div>
        </div>
    )})}
    {show&&
   <button className='Deletebutton' onClick={deleteAllHadler}>Delete All</button>

    }</div>
   
 
   
  )
}

export default Todo