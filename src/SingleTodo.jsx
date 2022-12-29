import React from "react";

function SingleTodo({ item }) {
  const handleEdit = (id) => {
    setIsEditing(true);
    const item = state.todos.find((todo) => todo.id === id);
    setTodo(item.todo);
    setEditId(item);
  };
  return (
    <div key={item.id} className="todoitem">
      <p
        onClick={() => dispatch({ type: "TOGGLE_TODO", payload: item.id })}
        style={{
          cursor: "pointer",
          textDecoration: item.completed ? "line-through" : "",
        }}
      >
        {item.todo}
      </p>
      <span onClick={() => dispatch({ type: "REMOVE_TODO", payload: item.id })}>
        &times;
      </span>
      <button onClick={() => handleEdit(item.id)}>Edit</button>
    </div>
  );
}

export default SingleTodo;
