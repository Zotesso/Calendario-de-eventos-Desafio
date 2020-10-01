import React, {useState, useEffect} from 'react';

import  Card  from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

   useEffect(() => {
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
        <p className="session-title">Eventos públicos</p>
        </header>
        
        <main>
        
          <Row>
         {events.map((anEvent: Event)=> (
              <Col sm={4} key={anEvent.id}>
                    <Card key={anEvent.id} border="dark" style={{ width: '36rem', height: '25rem' }}>
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
              </Col>
                ))}
            </Row>
        </main>
    </>
    );
}

export default AllEvents;