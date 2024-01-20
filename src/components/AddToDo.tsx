import { FormEvent, useState } from "react";
import { useTodos } from "../store/todos";

const AddToDo = () => {
  const [todo, settodo] = useState("");
const {handleAddToDo} = useTodos();


  const handleonFormSubmit = (e:FormEvent<HTMLElement>) => {
    e.preventDefault();
    handleAddToDo(todo);
    settodo("");

  };
  return (
    <form onSubmit={handleonFormSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => settodo(e.target.value)}
      />
      <button type="submit">ADD</button>
    </form>
  );
};

export default AddToDo;
