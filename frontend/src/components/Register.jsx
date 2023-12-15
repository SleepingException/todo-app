import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    name: '',
  });
  const navigate = useNavigate();

  const { username, password, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { username, password, name };
      const response = await fetch('http://localhost:8080/app/users/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.name) {
        navigate('/login');
        toast.success('Регистрация успешна');
      } else {
        setAuth(false);
        toast.error(parseRes.message);
      }
    } catch (err) {
      console.error('onSubmit form error: ', err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Регистрация</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Логин"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Пароль"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Имя"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Отправить</button>
      </form>
      <Link to="/login">Войти</Link>
    </Fragment>
  );
};

export default Register;
