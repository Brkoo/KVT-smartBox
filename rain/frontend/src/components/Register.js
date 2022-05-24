import { useState } from 'react';
import {Navigate} from "react-router-dom";

function Register() {
    const [name, setName] = useState([]);
    const [surname, setSurname] = useState([]);
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState([]);
    const [error, setError] = useState([]);

    async function Register(e){
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/register", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                username: username,
                password: password,
                phoneNumber: phoneNumber
            })
        });
        const data = await res.json();
        if(data._id !== undefined){
            window.location.href="/";
        }
        else{
            setName("");
            setSurname("");
            setUsername("");
            setPassword("");
            setEmail("");
            setPhoneNumber("");
            setError("Registration failed");
        }
    }

    return(
        <>
            <form onSubmit={Register}>
                <h3>Register</h3>
                <div>
                    <label>Name</label>
                    <input type="text"
                           name="name"
                           className="m-3"
                           placeholder="Enter name"
                           value={name}
                           onChange={(e)=>(setName(e.target.value))} />
                </div>
                <div>
                    <label>Surname</label>
                    <input type="text"
                           name="surname"
                           className="m-3"
                           placeholder="Surname"
                           value={surname}
                           onChange={(e)=>(setSurname(e.target.value))} />

                </div>
                <div>
                    <label>Phone number</label>
                    <input type="text"
                           name="phoneNumber"
                           className="m-3"
                           placeholder="Phone number"
                           value={phoneNumber}
                           onChange={(e)=>(setPhoneNumber(e.target.value))} />

                </div>
                <div>
                    <label>Email</label>
                    <input type="text"
                           name="email"
                           className="m-3"
                           placeholder="Email"
                           value={email}
                           onChange={(e)=>(setEmail(e.target.value))} />

                </div>
                <div>
                    <label>Username</label>
                    <input type="text"
                           name="username"
                           className="m-3"
                           placeholder="Username"
                           value={username}
                           onChange={(e)=>(setUsername(e.target.value))}/>

                </div>
                <div>
                    <label>Password</label>
                    <input type="password"
                           name="password"
                           className="m-3"
                           placeholder="Password"
                           value={password}
                           onChange={(e)=>(setPassword(e.target.value))} />
                </div>
                <div>
                    <label>{error}</label>
                </div>
                <div>
                    <button type="submit"
                            className="btn btn-dark">Register</button>
                </div>
            </form>
        </>


    );
}

export default Register;