import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { User } from "./types";
import { About } from "./components/About";
import { AddUser } from "./components/AddUser";
import { UsersList } from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "username": {
        setUsername(event.target.value);
        break;
      }
      case "email": {
        setEmail(event.target.value);
        break;
      }
      default: {
        throw new Error(`Unknown change event: ${event.target.name}`);
      }
    }
  };

  const addUser = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      username: username,
      email: email,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_API_SERVICE_URL}/users`,
      data
    );
    console.log(res);
    getUsers();
    setEmail("");
    setUsername("");
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

  useEffect(() => {
    // Fetch users on mount
    getUsers();
  }, []);

  return (
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
                    <AddUser
                      username={username}
                      email={email}
                      addUser={addUser}
                      handleChange={handleChange}
                    />
                    <br />
                    <br />
                    <UsersList users={users} />
                  </div>
                }
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
