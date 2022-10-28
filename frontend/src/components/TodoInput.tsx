import React, { useState, useEffect, useContext } from "react";
import { useAddTodo } from "../services/api";
import { AuthContext } from "../context/context";
import { ReactComponent as Plus } from "../assets/plus.svg";
import LoadingContainer from "./LoadingContainer";
import { toast } from "react-toastify";
import { ITodo } from "../types";

interface ITodoInputProps {
  array: ITodo[];
}

const TodoInput = ({ array }: ITodoInputProps) => {
  const [text, setText] = useState<string>("");

  const { mutate, isLoading, isSuccess, isError } = useAddTodo();

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError]);

  const addTodo = () => {
    if (text.length == 0) return;
    const newTodo = {
      _id: array.length + 1,
      todo: text,
    };
    mutate(newTodo);
  };

  useEffect(() => {
    if (isSuccess) {
      setText("");
    }
  }, [isSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        className="add-todo"
        placeholder="Add a todo"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className="add-todo-btn" onClick={addTodo} disabled={isLoading}>
        {isLoading ? <LoadingContainer /> : <Plus />}
      </button>
    </div>
  );
};

export default TodoInput;
