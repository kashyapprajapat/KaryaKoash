import AddToDo from "./components/AddToDo"
import Navbar from "./components/Navbar"
import Todos from "./components/Todos"
import "./App.css"
import { RiTodoLine } from "react-icons/ri";

const App = () => {
  return (
    <main>
      <h1><RiTodoLine className="icons" size={50}/> &nbsp;&nbsp;&nbsp;KaryaKoash &nbsp;&nbsp;&nbsp;<RiTodoLine className="icons" size={50}/></h1>
      <Navbar/>
      <AddToDo  />
      <Todos />
    </main>
  )
}

export default App