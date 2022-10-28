import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/context";
import Logout from "../assets/log-out.svg";
import Todo from "./Todo";
import Session from "supertokens-web-js/recipe/session";
import { useQuery } from "react-query";
import { fetchTodos } from "../services/api";
import TodoInput from "./TodoInput";
import LoadingContainer from "./LoadingContainer";
import { ITodo } from "../types";

const Home = () => {
  const { todos, signOut, addTodos } = useContext(AuthContext);

  async function logout() {
    await Session.signOut();
    signOut();
  }

  const { isLoading, data, isSuccess, isError } = useQuery("todos", fetchTodos);

  useEffect(() => {
    if (isSuccess) {
      addTodos(data?.data);
    }
  }, [isSuccess, data?.data]);

  const isTodosList = isSuccess && data?.data;

  if (isError) {
    return (
      <div className="center">
        <div>⚠️</div>
        <span>Something went wrong</span>
      </div>
    );
  }

  if (!isTodosList) {
    return (
      <div className="center">
        <LoadingContainer />
      </div>
    );
  }

  return (
    <>
      <h3>Todo List</h3>
      <button className="logout-container" onClick={logout}>
        <img src={Logout} alt="" className="svg" />
      </button>
      <TodoInput array={todos} />
      <div className="todo-container">
        {todos.map((item: ITodo) => {
          return <Todo key={item._id} item={item} />;
        })}
      </div>
    </>
  );
};

export default Home;
