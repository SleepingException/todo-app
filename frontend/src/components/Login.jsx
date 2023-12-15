import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const { username, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/app/login', {
        method: 'POST',
        body: `username=${username}&password=${password}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const parseRes = await response.json();

      if (parseRes.name) {
        setAuth(true);
        toast.success('Успешно вошли');
      } else {
        setAuth(false);
        toast.error(parseRes.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Войти</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Войти"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Отправить</button>
      </form>
      <Link to="/register">Регистрация</Link>
    </Fragment>
  );
};

export default Login;
