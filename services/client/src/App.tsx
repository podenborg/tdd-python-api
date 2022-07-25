import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  AddUserFormData,
  LoginFormData,
  LoginFormResponse,
  RegisterFormData,
  Tokens,
  User,
} from "./types";
import { About } from "./components/About";
import { NavBar } from "./components/NavBar";
import { AddUser } from "./components/AddUser";
import { UsersList } from "./components/UsersList";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState("TestDriven.io");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const getUsers = async () => {
    try {
      const resp = await axios.get<User[]>(
        `${process.env.REACT_APP_API_SERVICE_URL}/users`
      );
      setUsers(resp.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const addUser = async (data: AddUserFormData) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_SERVICE_URL}/users`,
      data
    );
    console.log(res);
    getUsers();
  };

  const logoutUser = () => {
    window.localStorage.removeItem("refreshToken");
    setAccessToken(null);
  };

  const handleRegisterFormSubmit = async (data: RegisterFormData) => {
    const url = `${process.env.REACT_APP_API_SERVICE_URL}/auth/register`;
    const res = await axios.post(url, data);
    console.log(res.data);
  };

  const handleLoginFormSubmit = async (data: LoginFormData) => {
    const url = `${process.env.REACT_APP_API_SERVICE_URL}/auth/login`;
    const res = await axios.post<Tokens>(url, data);
    console.log(res.data);
    setAccessToken(res.data.access_token);
    getUsers();
    window.localStorage.setItem("refreshToken", res.data.refresh_token);
  };

  const validRefresh = async () => {
    try {
      const token = window.localStorage.getItem("refreshToken");
      if (token) {
        const res = await axios.post<Tokens>(
          `${process.env.REACT_APP_API_SERVICE_URL}/auth/refresh`,
          { refresh_token: token }
        );
        setAccessToken(res.data.access_token);
        getUsers();
        window.localStorage.setItem("refreshToken", res.data.refresh_token);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const isAuthenticated = () => (accessToken || validRefresh() ? true : false);

  useEffect(() => {
    // Fetch users on mount
    getUsers();
  }, []);

  return (
    <div>
      <NavBar title={title} logoutUser={logoutUser} />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <br />
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <h1 className="title is-1">Users</h1>
                      <hr />
                      <br />
                      <AddUser addUser={addUser} />
                      <br />
                      <br />
                      <UsersList users={users} />
                    </div>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route
                  path="/register"
                  element={
                    <RegisterForm
                      isAuthenticated={isAuthenticated}
                      handleRegisterFormSubmit={handleRegisterFormSubmit}
                    />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <LoginForm
                      isAuthenticated={isAuthenticated}
                      handleLoginFormSubmit={handleLoginFormSubmit}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
