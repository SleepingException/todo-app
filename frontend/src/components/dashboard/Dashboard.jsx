import React from "react";

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ response, setResponse }) => {
  return (
    <>
      <InputTodo setResponse={setResponse} />
      <ListTodos allTodos={response.tasks} setResponse={setResponse} />
    </>
  );
};

export default Dashboard;
