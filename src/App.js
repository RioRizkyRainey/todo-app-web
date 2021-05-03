import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTodos,
  setCreatedTodo,
  getUpdatedTodo,
  getDeletedTodo,
  initStore
} from "./app/api";

// Styles
import "./app.scss";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";
import CreateTodo from "./components/CreateTodo";
import UpdateTodo from "./components/UpdateTodo";
import DeleteTodo from "./components/DeleteTodo";
import Modal from "./components/Modal";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import MySwal from "./index";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const [loading, setLoading] = useState(false);

  const [currentTodo, setCurrentTodo] = useState({
    _id: null,
    id: null,
    text: null,
    isDone: false,
    createdAt: null,
  });
  const [activeModal, setActiveModal] = useState({ text: "", isDone: false, active: false });
  const [savedTodos, setSavedTodos] = useState(todos);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const todosLastIndex = currentPage * pageSize;
  const todosFirstIndex = todosLastIndex - pageSize;
  const currentTodos = todos.slice(todosFirstIndex, todosLastIndex);

  // Setting up Modal
  const setModal = modal => {
    search("");
    setActiveModal({ name: modal, active: true });
  };

  // Pagination
  const paginate = page => {
    setCurrentPage(page);
  };

  // Search
  const search = term => {
    if (term.length > 2) {
      setCurrentPage(1);

      const results = savedTodos.filter(todo =>
        Object.keys(todo).some(key =>
          todo[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_TODOS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_TODOS", data: savedTodos });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
      case "id":
        const idSort = [...savedTodos].sort((a, b) => {
          return sorted
            ? a.id.localeCompare(b.id, "tr")
            : b.id.localeCompare(a.id, "tr");
        });
        dispatch({ type: "SET_TODOS", data: idSort });
        return;
      case "text":
        const textSort = [...savedTodos].sort((a, b) => {
          return sorted
            ? a.text.localeCompare(b.text, "tr")
            : b.text.localeCompare(a.text, "tr");
        });
        dispatch({ type: "SET_TODOS", data: textSort });
        return;
      case "isDone":
        const isDoneSort = [...savedTodos].sort((a, b) => {
          return sorted
            ? a.isDone.localeCompare(b.isDone, "tr")
            : b.isDone.localeCompare(a.isDone, "tr");
        });
        dispatch({ type: "SET_TODOS", data: isDoneSort });
        return;
      case "createdAt":
        const createdAtSort = [...savedTodos].sort((a, b) => {
          return sorted
            ? a.createdAt.localeCompare(b.createdAt, "tr")
            : b.createdAt.localeCompare(a.createdAt, "tr");
        });
        dispatch({ type: "SET_TODOS", data: createdAtSort });
        return;
      default:
        break;
    }
  };

  // Create Todo
  const createTodo = async todo => {
    setActiveModal(false);
    setLoading(true);
    console.log(todo)
    try {
      setCreatedTodo(todo).then(res => {
        dispatch({ type: "CREATE_TODO", data: todo });
        setSavedTodos([...todos, todo]);
      })
    } catch (err) {
      console.log(err)
      MySwal.fire({
        icon: "error",
        title: "Failed to create todo."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update Todo
  const updateRow = todo => {
    setModal("Update Todo");

    setCurrentTodo({
      id: todo.id,
      text: todo.text,
      isDone: todo.isDone,
      createdAt: todo.createdAt
    });
  };

  const updateTodo = async (id, updatedTodo) => {
    setActiveModal(false);
    setLoading(true);

    console.log(updatedTodo)
    try {
      getUpdatedTodo(updatedTodo)
      MySwal.fire({
        icon: "success",
        title: "Todo updated successfully."
      });

      dispatch({
        type: "SET_TODO",
        data: todos.map(todo =>
          todo.id === id ? Object.assign(todo, updatedTodo) : updatedTodo
        )
      });
    } catch (err) {
      console.log(err)
      MySwal.fire({
        icon: "error",
        title: "Failed to update todo."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete Todo
  const deleteRow = todo => {
    setModal("Delete Todo");

    console.log("current todo")
    console.log(todo)

    setCurrentTodo({
      _id: todo._id,
      id: todo.id,
      text: todo.text,
      isDone: todo.isDone,
      createdAt: todo.createdAt
    });
  };

  const deleteTodo = async id => {
    setActiveModal(false);
    setLoading(true);
    console.log(id)

    try {
      await getDeletedTodo(id)
      MySwal.fire({
        icon: "success",
        title: "Todo deleted successfully."
      })
      dispatch({
        type: "SET_TODOS",
        data: todos.filter(todo => todo.id !== id)
      });
      setSavedTodos(savedTodos.filter(todo => todo.id !== id));
      setCurrentPage(1);
    } catch (err) {
      console.log(err)
      MySwal.fire({
        icon: "error",
        title: "Failed to delete todo."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Todos
  const fetchTodos = async () => {
    setLoading(true);

    try {
      getTodos().then(data => {
        console.log(data)
        setSavedTodos(data);
        dispatch({ type: "SET_TODOS", data: data });
      })
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch todos."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  useEffect(() => {
    initStore();
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
                <Search search={search} resetSearch={search} />
                <button
                  className="primary-btn"
                  onClick={() => setModal("Create Todo")}
                >
                  Create New Todo
                </button>
              </div>
              <DataTable
                todos={currentTodos}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={todos.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Create Todo" && (
            <CreateTodo
              createTodo={createTodo}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update Todo" && (
            <UpdateTodo
              currentTodo={currentTodo}
              updateTodo={updateTodo}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete Todo" && (
            <DeleteTodo
              currentTodo={currentTodo}
              deleteTodo={deleteTodo}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default App;
