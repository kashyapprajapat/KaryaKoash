import { FormEvent, useState } from "react";
import { useTodos } from "../store/todos";
import { z, ZodError } from "zod";

// Create a Zod schema for the input
const todoSchema = z.string().trim().min(1, { message: "Todo cannot be empty" });

const AddToDo = () => {
  const [todo, setTodo] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const { handleAddToDo } = useTodos();

  const handleonFormSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      // Validate the input against the schema
      todoSchema.parse(todo);
      setValidationError(null); // No validation error, clear previous errors
      handleAddToDo(todo);
      setTodo("");
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle ZodError and set validation error message
        const errorMessage = error.errors[0]?.message ?? "Invalid input";
        setValidationError(errorMessage);
      }
    }
  };

  return (
    <form onSubmit={handleonFormSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit">ADD</button>
      {validationError && <p style={{ color: "red" }}>{validationError}</p>}
    </form>
  );
};

export default AddToDo;
