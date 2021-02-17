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
} from "../features/authSlice";

import { useHistory } from "react-router-dom";

function LogIn() {
  const server = useSelector(selectServer);
  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);
  const loggedIn = useSelector(selectSuccess);

  const history = useHistory();

  const dispatch = useDispatch();

  const [result] = useState();

  const submit = (e) => {
    e.preventDefault();
    dispatch(ping({ server, username, password }));
  };

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  return (
    <div className={`flex items-center h-full`}>
      <div className={`mx-auto w-64`}>
        <form className={`grid grid-cols-1 gap-6`} onSubmit={submit}>
          <label className={`block w-full`}>
            Server
            <input
              className={`block w-full`}
              type="text"
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
