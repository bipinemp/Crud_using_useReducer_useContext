import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { todoContext } from "./context/todoContext";

export default function App() {
  const { dispatch, state } = useContext(todoContext);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState("");

  const handleSubmit = (e) => {
    const id = uuidv4();
    e.preventDefault();

    if (!isEditing) {
      dispatch({
        type: "ADD_TODO",
        payload: { id: id, text: todo },
      });
      setTodo("");
    } else {
      dispatch({
        type: "UPDATE_TODO",
        payload: { ...selectedTodo, text: todo },
      });
      setIsEditing(false);
      setTodo("");
    }
  };

  const handleEdit = (val) => {
    setIsEditing(true);
    const item = state.todos.find((todo) => todo.id === val.id);
    setTodo(item.text);
    setSelectedTodo(item);
  };

  return (
    <div className="App">
      <br />
      <h1>Hello World This is Todo App</h1>
      <br />

      <form onSubmit={handleSubmit}>
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="Enter a todo"
        />
        <button>{isEditing ? "Update" : "Submit"}</button>
      </form>

      {state.todos.length === 0 && (
        <p style={{ margin: "20px auto", color: "crimson" }}>
          Not todos :{"("}
        </p>
      )}

      {state.todos.map((item) => (
        <div key={item.id} className="todoitem">
          <p
            onClick={() => dispatch({ type: "TOGGLE_TODO", payload: item.id })}
            style={{
              cursor: "pointer",
              textDecoration: item.completed ? "line-through" : "",
            }}
          >
            {item.text}
          </p>
          <span
            onClick={() => dispatch({ type: "REMOVE_TODO", payload: item.id })}
          >
            &times;
          </span>
          <button onClick={() => handleEdit(item)}>Edit</button>
        </div>
      ))}
    </div>
  );
}
