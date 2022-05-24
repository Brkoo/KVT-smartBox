//import Axios from 'axios'
import React,{useState,useEffect} from 'react';
import Moment from 'moment';

function Odklepi() {
    const [odklep, setOdkleps]=useState([])
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
        const getOdkleps = async function(){
            const res = await fetch("http://localhost:3001/odklep", {credentials: "include"});
            const data = await res.json();
            setOdkleps(data);
        }
        getOdkleps();
    },[]);


    return (
        <div>
            {/*Displaying items in a table*/}
            <center><h1>Zgodovina odklepov</h1></center>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>ID paketnika</th><th>Username</th><th>Date</th>
                </tr>
                </thead>
                <tbody>
                {odklep.map(odklep=>(
                    <tr>
                        <td>{odklep.paketnikId}</td>
                        <td>{odklep.username} </td>
                        <td>{Moment(odklep.datum).format('DD. MM YYYY / HH:mm:ss')}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
}

export default Odklepi;