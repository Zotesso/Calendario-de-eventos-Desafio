import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import  Card  from 'react-bootstrap/Card';

import moment from 'moment';
import 'moment/locale/pt-br';

import Header from '../../components/header';
import api from '../../services/api';
import './styles.css';

interface Event {
    id: number;
    title: string;
    description: string;
    eventStartTime: Date;
    eventEndTime: Date;
}

const Home = () => { 
    const [personalEvents, setPersonalEvents] = useState([]);

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');


    useEffect(() => {
        api.get(`events/private/${userId}`,{
            headers:{
                authorization: `Bearer ${token}`,
            }
        }).then(response => {
            setPersonalEvents(response.data);
        })
    }, [userId, token]);

    return (
        <>
        <header>
        <Header />
        </header>
        <main>
         {personalEvents.map((personalEvent: Event)=> (
                    <Card key={personalEvent.id} border="dark" style={{ width: '18rem', height: '20rem' }}>
                    <Card.Header>{personalEvent.title}</Card.Header>
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
                ))}
        </main>
    </>
    );
}

export default Home;