import axios from "axios";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  AddUserFormData,
  LoginFormData,
  RegisterFormData,
  Tokens,
  User,
} from "./types";
import { About } from "./components/About";
import { NavBar } from "./components/NavBar";
import { UsersList } from "./components/UsersList";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
import { UserStatus } from "./components/UserStatus";
import { Message } from "./components/Message";
import { AddUser } from "./components/AddUser";

const modalStyles = {
  content: {
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    border: 0,
    background: "transparent",
  },
};

Modal.setAppElement(document.getElementById("root")!);

function App() {
  const [title] = useState("TestDriven.io");
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [messageType, setMessageType] = useState<string | null>(null);
  const [messageText, setMessageText] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const createMessage = (type = "success", text = "Sanity Check") => {
    setMessageType(type);
    setMessageText(text);
    setTimeout(removeMessage, 3000);
  };

  const removeMessage = () => {
    setMessageType(null);
    setMessageText(null);
  };

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
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_SERVICE_URL}/users`,
        data
      );
      console.log(res);
      handleCloseModal();
      createMessage("success", "User added.");
      getUsers();
    } catch (error) {
      console.log(error);
      handleCloseModal();
      createMessage("success", "User added.");
    }
  };

  const removeUser = async (userId: number) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_SERVICE_URL}/users/${userId}`
      );
      console.log(res);
      createMessage("success", "User removed.");
      getUsers();
    } catch (error) {
      console.log(error);
      createMessage("danger", "Something went wrong.");
    }
  };

  const logoutUser = () => {
    window.localStorage.removeItem("refreshToken");
    setAccessToken(null);
    createMessage("success", "You have logged out.");
  };

  const handleRegisterFormSubmit = async (data: RegisterFormData) => {
    try {
      const url = `${process.env.REACT_APP_API_SERVICE_URL}/auth/register`;
      const res = await axios.post(url, data);
      console.log(res.data);
      createMessage("success", "You have registered successfully.");
    } catch (error) {
      console.log(error);
      createMessage("danger", "That user already exists.");
    }
  };

  const handleLoginFormSubmit = async (data: LoginFormData) => {
    try {
      const url = `${process.env.REACT_APP_API_SERVICE_URL}/auth/login`;
      const res = await axios.post<Tokens>(url, data);
      console.log(res.data);
      setAccessToken(res.data.access_token);
      window.localStorage.setItem("refreshToken", res.data.refresh_token);
      createMessage("success", "You have logged in successfully.");
      getUsers();
    } catch (error) {
      console.log(error);
      createMessage("danger", "Incorrect email and/or password.");
    }
  };

  const validRefresh = () => {
    try {
      const token = window.localStorage.getItem("refreshToken");
      if (token) {
        return axios
          .post<Tokens>(
            `${process.env.REACT_APP_API_SERVICE_URL}/auth/refresh`,
            { refresh_token: token }
          )
          .then((res) => {
            setAccessToken(res.data.access_token);
            window.localStorage.setItem("refreshToken", res.data.refresh_token);
            getUsers();
            return true;
          });
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const isAuthenticated = () => {
    if (accessToken) return true;
    else if (validRefresh()) return true;
    else return false;
  };

  useEffect(() => {
    // Fetch users on mount
    getUsers();
  }, []);

  return (
    <div>
      <NavBar
        title={title}
        logoutUser={logoutUser}
        isAuthenticated={isAuthenticated}
      />
      <section className="section">
        <div className="container">
          {messageType && messageText && (
            <Message
              messageText={messageText}
              messageType={messageType}
              removeMessage={removeMessage}
            />
          )}
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
                      {isAuthenticated() && (
                        <button
                          onClick={handleOpenModal}
                          className="button is-primary"
                        >
                          Add User
                        </button>
                      )}
                      <br />
                      <br />
                      <Modal isOpen={showModal} style={modalStyles}>
                        <div className="modal is-active">
                          <div className="modal-background" />
                          <div className="modal-card">
                            <header className="modal-card-head">
                              <p className="modal-card-title">Add User</p>
                              <button
                                className="delete"
                                aria-label="close"
                                onClick={handleCloseModal}
                              />
                            </header>
                            <section className="modal-card-body">
                              <AddUser addUser={addUser} />
                            </section>
                          </div>
                        </div>
                      </Modal>
                      <UsersList
                        users={users}
                        removeUser={removeUser}
                        isAuthenticated={isAuthenticated}
                      />
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
                <Route
                  path="/status"
                  element={
                    <UserStatus
                      accessToken={accessToken}
                      isAuthenticated={isAuthenticated}
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
