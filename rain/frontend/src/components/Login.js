import { useContext, useState } from 'react';
import { UserContext } from '../userContext';

import React from "react";



function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext);

    async function Login(e){
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        //userContext.setUserContext(data, data)
        if(data._id !== undefined){
            window.location.href="/profile";
            console.log(data)
            //if(res.status === 200){
            userContext.setUserContext(data);
            console.log(userContext.user);
        } else {
            setUsername("");
            setPassword("");
            setError("Invalid username or password");
        }
    }
    /*
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext);

    async function Login(e){
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        // if(res.status === 401){
        //     setUsername("");
        //     setPassword("");
        //     setError("Invalid username or password");
        // }
        // else{
        //     userContext.setUserContext(data);
        //
        // }
        if(data._id !== undefined){
        //if(error || !username){
            userContext.setUserContext(data);
        } else {
            setUsername("");
            setPassword("");
            setError("Invalid username or password");
        }
    }*/

    return (
            <>
                <div className="App">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                                <form id="loginform" onSubmit={Login}>
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="EmailInput"
                                            name="EmailInput"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter email"
                                            onChange={(event) => setUsername(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </div>
                                    <br></br>
                                    <button  className="btn btn-dark">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

        </>
    );
}

export default Login;