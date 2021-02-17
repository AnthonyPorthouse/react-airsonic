import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setServer, setPassword, setUsername, selectServer, selectPassword, selectUsername, ping} from './features/authSlice';

function LogIn() {

    const server = useSelector(selectServer);
    const username = useSelector(selectUsername);
    const password = useSelector(selectPassword);

    const dispatch = useDispatch();

    const [result] = useState();

    const submit = e => {
        e.preventDefault();
        dispatch(ping({server, username, password}));
    }

    return (
        <div className={`w-64`}>
            <form className={`my-auto grid grid-cols-1 gap-6`} onSubmit={submit}>
                <label className={`block w-full`}>
                    Server
                    <input className={`block w-full`} type="text" value={server}
                           onChange={(e) => dispatch(setServer(e.target.value))}/>
                </label>
                <label className={`block w-full`}>
                    Username
                    <input className={`block w-full`} type="text" value={username}
                           onChange={(e) => dispatch(setUsername(e.target.value))}/>
                </label>
                <label className={`block w-full`}>
                    Password
                    <input className={`block w-full`} type="password" value={password}
                           onChange={(e) => dispatch(setPassword(e.target.value))}/>
                </label>
                <button className={`block w-full`}>Log In</button>
            </form>
            {result ? <div>{result['subsonic-response'].status}</div> : null}
        </div>
    )
}

export default LogIn;
