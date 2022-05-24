import logo from './logo.svg';
//import './App.css';
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {UserContext} from "./userContext";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Register from "./components/Register";
import PaketnikDodaj from "./components/PaketnikDodaj";
import PrikazPaketnikov from "./components/PrikazPaketnikov";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Odklepi from "./components/Odklepi";
import DodajUsera from "./components/DodajUsera";





function App() {

    const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
    const updateUserData = (userInfo) => {
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
    }

    return (
        <BrowserRouter>
        <div className="App">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Direct4.me</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/paketnikPrikaz">Paketniki</Nav.Link>
                            <Nav.Link as={Link} to="/paketnikDodaj">Dodaj paketnik</Nav.Link>
                            <Nav.Link as={Link} to="/odklepi">Zgodovina odklepov</Nav.Link>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>

                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                <Routes>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                    <Route path="/" exact element={<Home/>}></Route>
                    <Route path="/profile" element={<Profile/>}></Route>
                    <Route path="/paketnikDodaj" element={<PaketnikDodaj/>}></Route>
                    <Route path="/odklepi" element={<Odklepi/>}></Route>
                    <Route path="/paketnikPrikaz" element={<PrikazPaketnikov/>}></Route>
                    <Route path="/dodajUser/:iden" element={<DodajUsera/>}></Route>
                    <Route path="/logout" element={<Logout/>}></Route>
                </Routes>
            </div>
        </div>
        </BrowserRouter>

    );
}

export default App;
