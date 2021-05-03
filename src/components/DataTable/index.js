import React from "react";

// Styles
import "./style.scss";

// Images
import CheckIcon from "../../img/check-circle.png";
import CloseIcon from "../../img/close-circle.png";
import SortIcon from "../../img/sort-icon.png";

const DataTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th
              onClick={() => {
              }}
            >
              <span className="column-sort">
                Todo
              </span>
            </th>
            <th
              onClick={() => {
              }}
            >
              <span className="column-sort">
                Is Done
              </span>
            </th>
            <th
              onClick={() => {
              }}
            >
              <span className="column-sort">
                Created At
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.todos.length ? (
            props.todos.map(todo => {

              var icon = CheckIcon;
              if (!todo.isDone) {
                icon = CloseIcon
              }
              return (
                <tr key={todo.id}>
                  <td>{todo.text}</td>
                  <td>
                    <span className="column-sort">
                      <img src={icon} alt="isDone" />
                    </span>
                  </td>
                  <td>{todo.createdAt}</td>
                  <td className="field-actions">
                    <button
                      className="primary-btn"
                      onClick={() => {
                        props.updateRow(todo);
                      }}
                    >
                      Update
                  </button>
                    <button
                      className="field-actions__delete"
                      onClick={() => props.deleteRow(todo)}
                    >
                      Delete
                  </button>
                  </td>
                </tr>)
            })
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
