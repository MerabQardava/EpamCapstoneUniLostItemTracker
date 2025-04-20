import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

function NavigationComponent(props) {
    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Lost & Found</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/reports">Home</Nav.Link>
                    <Nav.Link href="/reports/upload">Upload</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigationComponent;


