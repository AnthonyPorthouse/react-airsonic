import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
          <label className={`block w-full`}>
            Server
            <input
              className={`block w-full`}
              type="url"
              value={server}
              onChange={(e) => dispatch(setServer(e.target.value))}
            />
          </label>
          <label className={`block w-full`}>
            Username
            <input
              className={`block w-full`}
              type="text"
              value={username}
              onChange={(e) => dispatch(setUsername(e.target.value))}
            />
          </label>
          <label className={`block w-full`}>
            Password
            <input
              className={`block w-full`}
              type="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
          </label>
          <button className={`block w-full`}>Log In</button>
        </form>
        {result ? <div>{result["subsonic-response"].status}</div> : null}
      </div>
    </div>
  );
}

export default LogIn;
