import React from 'react';
import  Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useHistory } from 'react-router-dom';
import { FiPlusCircle, FiUser, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';

import './styles.css';

const Header = () => {
    const history = useHistory();
    
    function handleLogout (){
        localStorage.clear();
        history.push('./');
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>Agenda Eventos</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" ></Navbar.Toggle>
     
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav fill variant="tabs" className="mr-auto"  defaultActiveKey="/">
            <Nav.Item>
                    <Link to="/events" className="link">
                        Todos Eventos
                    </Link>
            </Nav.Item>
            <Nav.Item>
                    <Link to="/myevents" className="link">
                        Meus Eventos
                    </Link>
            </Nav.Item>   
        </Nav>
          <Link to="/" className="link">
                <FiPlusCircle size={22} color="#333"/>
                 Adicionar Evento
            </Link>
            {localStorage.getItem("userId") === null &&
            <section className="login-section">
            <Link to="/login" className="link">
                <FiLogIn size={22} color="#333"/>
                <FiUser size={22} color="#333"/>
                 Entrar
            </Link>
            <Link to="/register" className="link">
                <FiUserPlus size={22} color="#333"/>
                  Registrar
            </Link>
            </section>
            }
            {localStorage.getItem("userId") !== null &&
                <button onClick={handleLogout} type="button">
                    <FiLogOut size={22} color="#333"/>
                    <FiUser size={22} color="#333"/>
                     Sair
                </button>
            }
        </Navbar.Collapse>
        
      </Navbar>  
    );
}

export default Header;