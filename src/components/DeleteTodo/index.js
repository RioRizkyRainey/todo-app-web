import React, { useState, useEffect } from "react";

const DeleteTodo = props => {
  const [todo, setTodo] = useState(props.currentTodo);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    console.log("current todo id " + props.currentTodo._id)
    setTodo(props.currentTodo);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.deleteTodo(todo._id);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {todo.text}?
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Delete</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DeleteTodo;
