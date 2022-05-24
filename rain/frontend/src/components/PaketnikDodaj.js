import { useState } from 'react';
import {Navigate} from "react-router-dom";

function PaketnikDodaj() {
    const [id, setId] = useState([]);
    const [ulica, setUlica] = useState([]);
    const [hisnaStevilka, setHisnaStevilka] = useState([]);
    const [postnaStevilka, setPostnaStevilka] = useState([]);
    const [mesto, setMesto] = useState([]);
    const [slika, setSlika] = useState([]);
    const [error, setError] = useState([]);

    async function Paketnik(e){
        e.preventDefault();
        const res = await fetch("http://localhost:3001/paketnik/dodajPost", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                ulica: ulica,
                hisnaStevilka: hisnaStevilka,
                postnaStevilka: postnaStevilka,
                mesto: mesto,
                slika: slika
            })
        });
        const data = await res.json();
        if(data._id !== undefined){
            window.location.href="/";
        }
        else{
            setId("");
            setUlica("");
            setHisnaStevilka("");
            setPostnaStevilka("");
            setMesto("");
            setSlika("");
            setError("PaketnikDodaj creation failed");
        }
    }

    return(
        <>
            <form onSubmit={Paketnik}>
                <h3>Dodaj paketnik</h3>
                <div>
                    <label>ID paketnika</label>
                    <input type="text"
                           name="id"
                           className="m-3"
                           placeholder="Enter ID"
                           value={id}
                           onChange={(e)=>(setId(e.target.value))}/>
                </div>
                <div>
                    <label>Street</label>
                    <input type="text"
                           name="ulica"
                           className="m-3"
                           placeholder="Enter street"
                           onChange={(e)=>(setUlica(e.target.value))}/>
                </div>
                <div>
                    <label>House number</label>
                    <input type="text"
                           name="hisnaStevilka"
                           className="m-3"
                           placeholder="Enter house number"
                           onChange={(e)=>(setHisnaStevilka(e.target.value))}/>
                </div>
                <div>
                    <label>Post code</label>
                    <input type="text"
                           name="postnaStevilka"
                           className="m-3"
                           placeholder="Enter post code"
                           onChange={(e)=>(setPostnaStevilka(e.target.value))}/>
                </div>
                <div>
                    <label>City</label>
                    <input type="text"
                           name="mesto"
                           className="m-3"
                           placeholder="Enter city"
                           onChange={(e)=>(setMesto(e.target.value))}/>
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

export default PaketnikDodaj;