import { useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Authenticated, ping, useAuth } from "../api/auth";
import logo from "../images/logo192.png";

function LogIn({
  setAuth,
}: {
  setAuth: Dispatch<SetStateAction<Authenticated>>;
}) {
  const auth = useAuth();

  const [server, setServer] = useState(auth.credentials.server);
  const [username, setUsername] = useState(auth.credentials.username);
  const [password, setPassword] = useState(auth.credentials.password);

  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as any)?.from || "/";

  const { isError, isSuccess, data } = useQuery(
    ["auth", auth.credentials],
    () => ping(auth.credentials),
    {
      enabled: auth.credentials.server !== "",
    }
  );

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();

    setAuth((prevState) =>
      Object.assign({}, prevState, {
        isAuthenticated: false,
        credentials: {
          server,
          username,
          password,
        },
      })
    );
  };

  useEffect(() => {
    if (isSuccess && data.authenticated) {
      localStorage.setItem("ra.server", server);
      localStorage.setItem("ra.username", username);
      localStorage.setItem("ra.password", password);
      setAuth(Object.assign({}, auth, { isAuthenticated: true }));
    }
  }, [auth, data, isSuccess, password, server, setAuth, username]);

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
