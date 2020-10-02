import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import  Card  from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import moment from 'moment';
import 'moment/locale/pt-br';

import Header from '../../components/header';
import api from '../../services/api';
import './styles.css';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';

interface Event {
    id: number;
    title: string;
    description: string;
    eventStartTime: Date;
    eventEndTime: Date;
}

const UserEvents = () => { 
    const [personalEvents, setPersonalEvents] = useState([]);

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');


    useEffect(() => {
        if(userId){
            api.get(`events/private/${userId}`,{
                headers:{
                    authorization: `Bearer ${token}`,
                }
            }).then(response => {
                setPersonalEvents(response.data);
            })
        }
    }, [userId, token]);

    async function handleDeleteIncident(id: Number){
        try{
            await api.delete(`events/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    user: userId,
                }
            });

            setPersonalEvents(personalEvents.filter((personalEvent: Event) => personalEvent.id !== id));

        }catch(err){
            alert('Erro ao deletar caso');
        }
    }

    return (
        <>
        <header>
        <Header />
        <p className="session-title">Meus eventos</p>
        {!userId && 
        <p className="session-warning">Faça login para ter acesso aos seus eventos!</p>
        }
        </header>
        <main>
        <Row>
         {personalEvents.map((personalEvent: Event)=> (
             <Col sm={4} key={personalEvent.id}>
                    <Card key={personalEvent.id} border="dark" style={{ width: '36rem', height: '25rem' }}>
                    <Card.Header className="userCard">
                        <Link to={{
                            pathname: '/edit', 
                            state: {
                                id: personalEvent.id,
                                title: personalEvent.title,
                                description: personalEvent.description,
                                eventStartTime: new Date(personalEvent.eventStartTime),
                                eventEndTime: new Date(personalEvent.eventEndTime),
                            }
                            }}  className="edit-button">
                            <FiEdit title="Editar Evento" size={20} color="FFF" />
                        </Link>
                        <button title="Deletar evento"
                        onClick={() => handleDeleteIncident(personalEvent.id)} type="button">
                                <FiTrash2 size={20} color="FFF" />
                            </button>
                    </Card.Header> 
                    <Card.Body>
                      <Card.Title>{personalEvent.title}</Card.Title>
                      <Card.Text>
                        {personalEvent.description}
                      </Card.Text>
                      <Card.Text>
                       Começa: {moment(personalEvent.eventStartTime).format('LLL')}
                       <br/>
                       Termina: {moment(personalEvent.eventEndTime).format('LLL')}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
            ))}
        </Row>
        </main>
        <footer>
          <Footer />
        </footer>
    </>
    );
}

export default UserEvents;