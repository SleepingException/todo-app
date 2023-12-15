import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="jumbotron mt-5">
      <h1>Добро пожаловать в Todo List App</h1>
      <p>Войдите и создайте свой todo list</p>
      <Link to="/login" className="btn btn-primary">
        Войти
      </Link>
      <Link to="/register" className="btn btn-primary ml-3">
        Регистрация
      </Link>
    </div>
  );
};

export default Landing;
