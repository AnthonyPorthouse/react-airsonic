import { useQuery } from "@tanstack/react-query";
import { SyntheticEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../Providers/AuthProvider.js";
import { ping } from "../api/auth.js";
import logo from "../images/logo192.png";

function LogIn() {
  const auth = useAuth();

  const [server, setServer] = useState(auth.credentials.server);
  const [username, setUsername] = useState(auth.credentials.username);
  const [password, setPassword] = useState(auth.credentials.password);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/";

  const { isError, isSuccess, data } = useQuery({
    queryKey: ["auth", auth.credentials],
    queryFn: () => ping(auth.credentials),
    enabled: auth.credentials.server !== "",
  });

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();

    auth.setAuth({
      isAuthenticated: false,
      credentials: {
        server,
        username,
        password,
      },
    });
  };

  useEffect(() => {
    if (isSuccess && data.authenticated) {
      localStorage.setItem("ra.server", server);
      localStorage.setItem("ra.username", username);
      localStorage.setItem("ra.password", password);
      auth.setAuth({
        credentials: { ...auth.credentials },
        isAuthenticated: true,
      });
      auth.setCredentials({ server, username, password });
    }
  }, [auth, data, isSuccess, password, server, username]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(from, {
        replace: true,
      });
    }
  }, [auth.isAuthenticated, navigate, from]);

  return (
    <div className={`flex flex-auto items-center h-auto`}>
      <div className={`mx-auto w-64`}>
        {isError ? <div> Something Went Wrong</div> : null}

        <form className={`grid grid-cols-1 gap-6`} onSubmit={submit}>
          <img
            className={`mx-auto`}
            src={logo}
            alt="Ra Logo"
            role="presentation"
          />
          <label className={`block w-full`}>
            Server
            <input
              name="server"
              data-testid="server"
              className={`block w-full`}
              type="url"
              value={server}
              onChange={(e) => setServer(e.target.value)}
            />
          </label>
          <label className={`block w-full`}>
            Username
            <input
              name="username"
              data-testid="username"
              className={`block w-full`}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className={`block w-full`}>
            Password
            <input
              name="password"
              data-testid="password"
              className={`block w-full`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button data-testid="login" className={`block w-full`}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
