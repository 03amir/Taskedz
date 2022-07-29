import "./singleTask.css";
import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

function SingleTask({ todo, deleteTodo, markAsRead, index }) {
  return (
    <div className={todo.completed ? "completedTaskCard" : "taskCard"}>
      <p className="index">{index}.</p>

      {todo.completed ? (
        <div className="readBox">
          <CheckCircleRoundedIcon className="readMark" />
        </div>
      ) : null}

      <p className="taskTittle">{todo.body}</p>

      <hr />

      <div className="buttons">
        <button
          onClick={() => {
            markAsRead(todo._id, todo.completed);
          }}
          className={todo.completed ? "completeCompleteBtn" : "completeBtn"}
        >
          {todo.completed ? "Mark as incomplete" : "Mark as complete"}
        </button>

        <button
          onClick={() => {
            deleteTodo(todo._id);
          }}
          className="deleteBtn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SingleTask;
