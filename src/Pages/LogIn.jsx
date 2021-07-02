import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../images/logo192.png";
import {
  setServer,
  setPassword,
  setUsername,
  selectServer,
  selectPassword,
  selectUsername,
  ping,
  selectSuccess,
  selectAuth,
} from "../features/authSlice";

import { useHistory } from "react-router-dom";

function LogIn() {
  const server = useSelector(selectServer);
  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);
  const loggedIn = useSelector(selectSuccess);
  const auth = useSelector(selectAuth);

  const history = useHistory();
  const dispatch = useDispatch();
  const [result] = useState();

  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    dispatch(ping(auth));
  };

  useEffect(() => {
    if (!autoLoginAttempted && server) {
      dispatch(ping(auth));
    }

    setAutoLoginAttempted(true);
  }, [auth, autoLoginAttempted, dispatch, server]);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  return (
    <div className={`flex flex-auto items-center h-auto`}>
      <div className={`mx-auto w-64`}>
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
              onChange={(e) => dispatch(setServer(e.target.value))}
            />
          </label>
          <label className={`block w-full`}>
            Username
            <input
              data-testid="username"
              className={`block w-full`}
              type="text"
              value={username}
              onChange={(e) => dispatch(setUsername(e.target.value))}
            />
          </label>
          <label className={`block w-full`}>
            Password
            <input
              data-testid="password"
              className={`block w-full`}
              type="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
          </label>
          <button data-testid="login" className={`block w-full`}>
            Log In
          </button>
        </form>
        {result ? <div>{result["subsonic-response"].status}</div> : null}
      </div>
    </div>
  );
}

export default LogIn;
