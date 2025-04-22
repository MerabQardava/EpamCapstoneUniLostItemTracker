import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import { Link } from 'react-router-dom';
import {useAuth} from "../api/AuthContext";
import NotificationsDropdownComponent from "./NotificationsDropdownComponent";

function NavigationComponent() {
    const {isAuthenticated,logout} = useAuth();


    console.log(isAuthenticated)
    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Lost & Found</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/reports">Home</Nav.Link>
                    <Nav.Link as={Link} to="/reports/upload">Upload</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <div className="d-flex gap-2">
                    {!isAuthenticated && <>
                        <Button as={Link} to="/login" variant="outline-light">Login</Button>
                        <Button as={Link} to="/register" variant="light">Register</Button></>
                    }
                    {isAuthenticated && <Button onClick={logout} variant="light">Logout</Button>}
                    {isAuthenticated && <NotificationsDropdownComponent isLoggedIn={true} />}
                </div>
            </Container>
        </Navbar>
    );
}

export default NavigationComponent;


