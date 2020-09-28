import React from 'react';
import  Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiUser, FiLogIn } from 'react-icons/fi';

import './styles.css';

const Header = () => {
    return(
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>Agenda Eventos</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" ></Navbar.Toggle>
     
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav fill variant="tabs" className="mr-auto"  defaultActiveKey="/home">
            <Nav.Item>
                    <Link to="/" className="link">
                        Todos Eventos
                    </Link>
            </Nav.Item>
            <Nav.Item>
                    <Link to="/" className="link">
                        Meus Eventos
                    </Link>
            </Nav.Item>   
        </Nav>
          <Link to="/" className="link">
                <FiPlusCircle size={22} color="#333"/>
                 Adicionar Evento
            </Link>
            <Link to="/" className="link">
                <FiLogIn size={22} color="#333"/>
                <FiUser size={22} color="#333"/>
                 Entrar
            </Link>
        </Navbar.Collapse>
        
      </Navbar>  
    );
}

export default Header;