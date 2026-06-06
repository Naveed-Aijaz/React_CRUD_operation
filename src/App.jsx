// import { useState } from "react"
// import moment from "moment"

// import { use, useState } from "react"



//  function App(){

// //   const [Title, setTitle] = useState("")
// //   const [Desc, setDesc] = useState("")
// // const [Todos, setTodos  ] = useState([])


// // const createTodo = (e) => {
// // e.preventDafaul( )
// // }


// // const newTodo = {
// //   title: title,
// //   Desc: Desc,
// //   createAt: new Date().getTime 
// // }

// // setTodo([newTodo, ...todos])


//   return(
//     <div className="main">

//       <form onSubmit={createTodo}>
//         e.preventDafault()
//         <input type="text"
//         placeholder="Enter Title"
//         onChange={(e) => setTitle(e.target.value)}
//          />

//          <textarea placeholder="Desc" 
//          onChange={(e) => setDesc(e.target.value)}
//           />

//       </form>

//       <div className="result">
//         {todos.map((singleTodo)  =>{
//           return( 
//             <div className="post">

//               <h2>{singleTodo.title}</h2>
//               <p>{singleTodo.Desc}</p>
//               <b>{moment(singleTodo.createAt).fromNow}</b> 
//               <butt>Delete</butt>
//               <butt>Edit</butt>

//             </div>
//           )
//         })}



//       </div>


//     </div>

//   )
//  }



//  export default App

import { useEffect, useState } from 'react'
import './App.scss'
import moment from "moment"
// import { jsxs } from "react/jsx-runtime"

function App() {



  const [Title, setTitle] = useState("")
  const [Desc, setdesc] = useState("")
  const [Todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("Todos")) || [];

  })

  // <====== CreateTodo ======>

  const Create_Todo = (e) => {
    console.log(e.target.value)
    e.preventDefault()

    if (!Title || !Desc) {
      alert("All Fields Are Required")
      return
    }

    const newTodo = {
      Title: Title,
      Desc: Desc,
      createAt: new Date().getTime()

    }
    setTodos([newTodo, ...Todos])
    e.target.reset()
  }


  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  }, [Todos]);

  // <--------- Delete ------->

  const delete_todo = (time) => {
     
    const filteredTodos = Todos.filter((todo) => {
      return todo.createAt !== time

    })

    setTodos(filteredTodos)

    console.log(filteredTodos)
  }



  // <========= Edit ==========>

  const edit_todo = (time) => {
    const oldTodos = Todos.find((todo) => {
      return todo.createAt === time

    })

    console.log(oldTodos)

    const updateTitle = prompt("Enter new Title", oldTodos.Title)
    const updateDesc = prompt("Enter new Desc", oldTodos.Desc)

    const updatedTodos = Todos.map((todo) => {
      return todo.createAt === time ?
        {
          ...todo,
          Title: updateTitle,
          Desc: updateDesc
        } : todo

    })

    setTodos(updatedTodos)
  }




  return (
    <div className="main">
      <h1>TodoApp React</h1>
      <form onSubmit={Create_Todo}>


        <input type="text"
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Enter Desc"
          onChange={(e) => setdesc(e.target.value)}
          required

        />

        <button>Submit</button>

      </form>

      <div className="result">
        {Todos.map((singleTodos, index) => {
          return (
            <div key={index} className="post">
              <h2>{singleTodos.Title}</h2>
              <p>{singleTodos.Desc}</p>
              <b>{moment(singleTodos.createAt).fromNow()}</b>
              <div className="btn_Container">
                <button className="delete" onClick={() => delete_todo(singleTodos.createAt)}>Delete</button>
                <button className="edit" onClick={() => edit_todo(singleTodos.createAt)}>Edit</button>



              </div>

            </div>
          )
        })}

      </div>



    </div>
  )
  console, log(e.target.value)

}





export default App

