import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import  Card  from 'react-bootstrap/Card';

import Header from '../../components/header';
import api from '../../services/api';

import moment from 'moment';
import 'moment/locale/pt-br';

import './styles.css';

interface Event {
    id: number;
    title: string;
    description: string;
    name: string;
    eventStartTime: Date;
    eventEndTime: Date;
}

const Home = () => { 
    const [events, setEvents] = useState([]);
    moment.locale('pt-BR');
    
    useEffect(() => {
        api.get(`events/public`).then(response => {
            setEvents(response.data);
        })
    }, []);

    return (
        <>
        <header>
        <Header />
        </header>
        <main>
         {events.map((anEvent: Event)=> (
                    <Card key={anEvent.id} border="dark" style={{ width: '18rem', height: '20rem' }}>
                    <Card.Header>{anEvent.title}</Card.Header>
                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text>Descrição:

                        {anEvent.description}
                      </Card.Text>
                      <Card.Text>
                       Começa: {moment(anEvent.eventStartTime).format('LLL')}
                       <br/>
                       Termina: {moment(anEvent.eventEndTime).format('LLL')}
                      </Card.Text>
                      <Card.Text>
                        <small className="text-muted">
                        <cite title="Source Title">Autor: {anEvent.name}</cite>
                        </small>
                    </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
        </main>
    </>
    );
}

export default Home;