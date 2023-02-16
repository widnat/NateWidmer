import React from "react";
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



export default function NavBar() {
    const router = useRouter()
    
    function navigate(event:string) {
        // if (event === /)
        // router.push(route);
    }

    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Projects</Navbar.Brand>Pricing
          <Nav className="me-auto">
            <Nav.Link href="#home">1111111111</Nav.Link>
            <Nav.Link href="#features">222222222222</Nav.Link>
            <Nav.Link href="#pricing">3333333333333</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}