import React, { useState } from "react";

const CreateTodo = props => {
  const initialData = { id: null, text: "", isDone: false, createdAt: Date.now() };
  const [todo, setTodo] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!todo.text) return;
        props.createTodo(todo);
      }}
    >
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
        <button className="primary-btn" type="submit">Create</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateTodo;
