import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const Header = ({ setAuth, name }) => {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      setAuth(false);
      toast.success('Успешно вышли');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <h2 className="d-flex fs-4">
            <span style={{ color: 'green' }}>{name}</span>
            {name && "'s "}Todo List
          </h2>

          <button
            onClick={e => logout(e)}
            className="btn btn-outline-light me-2"
          >
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
