import { useState } from 'react';
import {Navigate, useParams} from "react-router-dom";
function DodajUsera() {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState([]);
    const [error, setError] = useState([]);
    const { iden } = useParams()

    async function Paketnik(e){
        e.preventDefault();
        const res = await fetch("http://localhost:3001/paketnik/dodajUser", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                iden: iden,
                uporabnik: users
            })
        });
        const data = await res.json();
        window.location.href="/paketnikPrikaz";
    }

    return(
        <>
            <form onSubmit={Paketnik}>
                <h3>Dodaj novega uporabnika</h3>
                <div>
                    <label>ID paketnika</label>
                    <input type="text"
                           name="iden"
                           id="iden"
                           className="m-3"
                           placeholder="Enter username"
                           value={iden}
                           disabled={true}
                    />
                </div>
                <div>
                    <label>Nov uporabnik</label>
                    <input type="text"
                           name="uporabnik"
                           id="uporabnik"
                           className="m-3"
                           placeholder="Enter username"
                           value={users}
                           onChange={(e)=>(setUsers(e.target.value))}/>
                </div>
                <div>
                    <label>{error}</label>
                </div>
                <div className="mt-1">
                    <button type="submit"
                            name="submit"
                            className="btn btn-dark">Create</button>
                </div>
            </form>
        </>
    );
}

export default DodajUsera;