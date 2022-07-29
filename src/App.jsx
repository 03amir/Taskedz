import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import SingleTask from "./components/SingleTask";
import { ToastContainer, toast } from "react-toastify";

const baseUrl = "https://taskedz.herokuapp.com";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  async function getAllTodos() {
    const res = await Axios.get(baseUrl);
    const allresult = res.data;
    setAllTodos(allresult);
  }

  useEffect(() => {
    document.title = "To-Do List";
    getAllTodos();
  }, []);


  async function addNewTodo() {
    if (newTodo == "") {
      toast.warn("Please Write a Task");
    } else {
      const res = await Axios.post(baseUrl, {
        body: newTodo,
      });
      getAllTodos();
      setNewTodo("");
      toast.success("Task Added Succefully");
    }
  }

  async function deleteTodo(id) {
    const deletedtodo = await Axios.delete(
      `${baseUrl}/delete/${id}`
    );
    console.log(deletedtodo);
    getAllTodos();
    toast.error("Task Deleted");
  }

  async function markAsRead(id, isCompleted) {
    const markedAsRead = await Axios.post(`${baseUrl}/mark`, {
      markId: id,
      completed: !isCompleted,
    });

    if (!isCompleted) toast.success("Task Completed");
    else toast.warn("Task Incomplete");

    getAllTodos();
  }

  return (
    <div className="app">
      <h1 className="heading">To-Do List</h1>
      <p className="addText">Add a new task in the list</p>

      <div className="inputBox">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          placeholder="Enter the task here"
        />
        <button onClick={addNewTodo} className="submitBtn">
          Submit
        </button>
      </div>

      <p>Added tasks in to-do list</p>

      <div className="allTasks">
        {allTodos?.length>0? allTodos.map((todo, index) => {
          return (
            <SingleTask
              key={todo._id}
              todo={todo}
              index={index + 1}
              deleteTodo={deleteTodo}
              markAsRead={markAsRead}
            />
          );
        }):
        // WHEN THERE IS NO TO-DO LEFT
        <h1>No Task Left</h1>}
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
