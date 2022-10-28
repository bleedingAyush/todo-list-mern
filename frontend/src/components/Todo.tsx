import React, { memo, useState } from "react";
import Delete from "../assets/trash-2.svg";
import { AuthContext } from "../context/context";
import "./Todo.scss";
import { useDeleteTodo, useUpdateCompletedTodo } from "../services/api";
import { ITodo } from "../types";

interface ITodoProps {
  item: ITodo;
}

const Todo = ({ item }: ITodoProps) => {
  const [checked, setChecked] = useState(item?.isCompleted);
  const { mutate } = useDeleteTodo();
  const { mutate: updateMutate } = useUpdateCompletedTodo();

  const handleChange = () => {
    const data = { ...item, isCompleted: !checked };
    updateMutate(data);
    setChecked((val) => !val);
  };

  const handleDelete = () => {
    mutate(item?._id);
  };

  return (
    <>
      <div className="todo-list-container">
        <div className="container">
          <div className="round" id="round">
            <input
              type="checkbox"
              id={`checkbox-${item._id}`}
              checked={checked}
              onChange={handleChange}
            />
            <label htmlFor={`checkbox-${item._id}`}></label>
          </div>
        </div>
        <span className="todo" id={`todo-${item._id}`}>
          {item.todo}
        </span>
        <div className="btn-container" onClick={handleDelete}>
          <button className="delete">
            <img src={Delete} alt="" className="svg" />
          </button>
        </div>
      </div>
    </>
  );
};

function equalFunction(prev: any, next: any) {
  return prev?._id == next?._id && prev.isCompleted == next?.isCompleted;
}
export default memo(Todo, equalFunction);
