import React from "react";
import Nav from 'react-bootstrap/Nav';
import { useRouter } from 'next/router';


export default function NavBar() {
    const router = useRouter()
    
    function navigate(event:string) {
        // if (event === /)
        // router.push(route);
    }

    return (
        <Nav
          activeKey="/home"
          onSelect={(selectedKey) => navigate(selectedKey!)}
          >
          <Nav.Item>
            <Nav.Link href="/home">
                <h1 className="green">Home</h1>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/home">Memoizit</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/home">Skull King</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/home">About Me</Nav.Link>
          </Nav.Item>
        </Nav>
    )
}