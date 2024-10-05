import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
           

            
            <Navbar  style={{height: "70px"}} data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">InspireZone</Navbar.Brand>
                    <Nav className="me-auto gap-3">
                        <NavLink style={{textDecoration: "none", color: "black"}} to="/">Home</NavLink>
                        <NavLink style={{textDecoration: "none", color: "black"}} to="/createblog">Create Blog</NavLink>
                        
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar
