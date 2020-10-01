import React, {useState, useEffect} from 'react';

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

const AllEvents = () => { 
    const [events, setEvents] = useState([]);

    moment.locale('pt-BR');

    const userId = localStorage.getItem('userId');

   useEffect(() => {
      console.log('refresh');
      try{
      api.get('events/public').then(response => {
        setEvents(response.data);
        }).catch((error: String) => {

      });

 
    }catch(error){
      }
    }, []);

    return (
        <>
        <header>
        <Header />
        </header>
        <main>
         {events.map((anEvent: Event)=> (
                    <Card key={anEvent.id} border="dark" style={{ width: '26rem', height: '24rem' }}>
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

export default AllEvents;