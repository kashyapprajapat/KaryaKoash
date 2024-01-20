import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
  children: ReactNode;
};

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodoContext = {
  todos: Todo[];
  handleAddToDo: (task: string) => void;
  toggleTodoAsCompleted:(id:string) => void;
  handleDeleteTodo:(id:string)=> void;
};

export const todoContext = createContext<TodoContext | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(()=>{
    try {
       const newTodos = localStorage.getItem("todos") || "[]";
    
        return JSON.parse(newTodos) as Todo[]
      } catch (error) {
      return [];
    }
  });

  const handleAddToDo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      // console.log("prev"+ prev)
      // console.log(newTodos)
      localStorage.setItem("todos",JSON.stringify(newTodos));
      return newTodos;
    });
  };


//toggle completed
  const toggleTodoAsCompleted = (id:string)=>{
         setTodos((prev) =>{
            let newTodos = prev.map((todo)=>{
                     if(todo.id ===id){
                        return {...todo,completed : !todo.completed}
                     }
                     return todo;
            })
            localStorage.setItem("todos",JSON.stringify(newTodos));
            return newTodos;
         })
  };

  //Delete Todo
 const  handleDeleteTodo = (id:string)=>{
    setTodos((prev)=>{
        let newTodos = prev.filter((filterTodo)=> filterTodo.id !== id)
        localStorage.setItem("todos",JSON.stringify(newTodos));
        return newTodos;
    })   
 }

  return (
    <todoContext.Provider value={{ todos, handleAddToDo,toggleTodoAsCompleted ,handleDeleteTodo }}>
      {children}
    </todoContext.Provider>
  );
};

export const useTodos = () => {
  const todosConsumer = useContext(todoContext);
  if (!todosConsumer) {
    throw new Error("useTodos used outside of Provider");
  }
  return todosConsumer;
};
