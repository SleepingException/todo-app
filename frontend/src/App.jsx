import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/Landing';
import Header from './components/Header';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [response, setResponse] = useState({ name: '', tasks: [] });

  const checkAuthenticated = async () => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        'http://localhost:8080/app/users/current',
        true,
        'username',
        'password'
      );
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            setResponse(JSON.parse(this.response));
            setIsAuthenticated(true);
          } else setIsAuthenticated(false);
        }
      };
      xhr.send();
    } catch (err) {
      console.error('checkAuthenticated error: ', err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <LocalizationProvider adapterLocale={'ru'} dateAdapter={AdapterDayjs}>
      <Router>
        {isAuthenticated && <Header setAuth={setAuth} name={response?.name} />}
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                !isAuthenticated ? (
                  <Landing />
                ) : (
                  <Dashboard response={response} setResponse={setResponse} />
                )
              }
            />
            <Route
              exact
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Dashboard response={response} setResponse={setResponse} />
                )
              }
            />
            <Route
              exact
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register setAuth={setAuth} />
                ) : (
                  <Dashboard
                    response={response}
                    setAuth={setAuth}
                    setResponse={setResponse}
                  />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard
                    response={response}
                    setAuth={setAuth}
                    setResponse={setResponse}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
