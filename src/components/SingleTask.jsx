import "./singleTask.css";
import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EditIcon from '@mui/icons-material/Edit';

function SingleTask({ todo, deleteTodo, markAsRead, index , actiateInputForEditing}) {
  return (
    <div className={todo.completed ? "completedTaskCard" : "taskCard"}>
      <p className="index">{index}.</p>

      {todo.completed ? (
        <div className="readBox">
          <CheckCircleRoundedIcon className="readMark" />
        </div>
      ) : null}

      <div className="upper">
        <p className="taskTittle">{todo.body}</p>
        <EditIcon className="editIcon" onClick = {() => {actiateInputForEditing(todo._id, todo.body)}}></EditIcon>
      </div>
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
