import React from "react";

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className="todo">
      <div className="main">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="function">
        <input
          onChange={() => updateHandler(id)}
          type={"checkbox"}
          checked={isCompleted}
          size="100px"
          color="black"
        />
        <button onClick={() => deleteHandler(id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
