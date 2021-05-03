import React, { useState, useEffect } from "react";

const UpdateTodo = props => {
  const [todo, setTodo] = useState(props.currentTodo);

  const onInputChange = event => {
    const { name, value } = event.target;

    setTodo({ ...todo, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setTodo(props.currentTodo);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!todo.text) return;
        props.updateTodo(todo);
      }}>
      <div className="form-group">
        <label>Todo</label>
        <input
          type="text"
          name="text"
          value={todo.text}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Is Done</label>
        <input
          type="checkbox"
          name="isDone"
          className="checkbox"
          onChange={onInputChange}
          value={todo.isDone}
          checked={todo.isDone}
        />
      </div>
      <div className="form-group">
        <input
          hidden
          type="text"
          name="createdAt"
          value={todo.createdAt}
          disabled
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Update</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateTodo;
