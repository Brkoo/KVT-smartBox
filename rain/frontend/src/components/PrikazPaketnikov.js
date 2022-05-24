//import Axios from 'axios'
import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";

function PrikazPaketnikov() {
    const [paketnik,setPaketniks]=useState([])
    /*useEffect(() => {
        fetchComments();
    }, [])*/

   /* useEffect(() => {
        console.log(paketnik)
    }, [paketnik])
    const fetchComments=async()=>{
        const response=await Axios("http://localhost:3001/paketnik/");
        setPaketniks(response.data)
    }*/
    useEffect(function(){
        const getPaketniks = async function(){
            const res = await fetch("http://localhost:3001/paketnik", {credentials: "include"});
            const data = await res.json();
            setPaketniks(data);
        }
    getPaketniks();
    },[]);


    return (
        <div>
            {/*Displaying items in a table*/}
            <center><h1>Moji paketniki</h1></center>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>ID paketnika</th><th>Naslov</th><th>Pooblaščeni uporabniki</th><th>Dodaj pooblastilo</th>
                </tr>
                </thead>
                <tbody>
                {paketnik.map(paketnik=>(
                    <tr>
                        <td>{paketnik.id}</td>
                        <td>{paketnik.hisnaStevilka} {paketnik.postnaStevilka} {paketnik.mesto}</td>
                        <td>{paketnik.users}</td>
                        <td>
                            <Link to={"/dodajUser/"+paketnik.id}>
                                <button type="submit" className="btn btn-dark">
                                    Add
                                </button>
                            </Link>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
}

export default PrikazPaketnikov;