import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header>
            <Link to="/login"><button>Dodajte dostop</button></Link>
            <h1>Pozdravljen, {props.name}</h1>
            <h2>{props.title}</h2>
        </header>
    )
}

export default Header;