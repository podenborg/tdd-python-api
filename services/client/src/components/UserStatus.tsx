/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Navigate } from "react-router-dom";

interface GetUserStatusResponse {
  email: string;
  username: string;
}

interface UserStatusProps {
  accessToken?: string | null;
  isAuthenticated: () => boolean;
}

export function UserStatus({ accessToken, isAuthenticated }: UserStatusProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUserStatus();
  }, [accessToken]);

  const getUserStatus = async () => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_SERVICE_URL}/auth/status`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(res.data);
      setEmail(res.data?.email ?? "");
      setUsername(res.data?.username ?? "");
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <ul>
        <li>
          <strong>Email:</strong>&nbsp;
          <span data-testid="user-email">{email}</span>
        </li>
        <li>
          <strong>Username:</strong>&nbsp;
          <span data-testid="user-username">{username}</span>
        </li>
      </ul>
    </div>
  );
}
