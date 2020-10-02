import React from 'react';

import Header from '../../components/header';
import EventController from '../../components/eventController';

import {RouteComponentProps}  from 'react-router-dom';
import './styles.css';
import Footer from '../../components/footer';

const EditEvent = (props: RouteComponentProps) => { 
    const state = props.location.state;

    return (
        <>
        <header>
            <Header />
        </header>
        <main>
        {props.location.state !== undefined &&
            <EventController 
            title={(state as any).title}
            description={(state as any).description}
            eventStartTime={(state as any).eventStartTime}
            eventEndTime={(state as any).eventEndTime}
            visibility='private' 
            eventId={(state as any).id}
            />
        }
        </main>
        <footer>
          <Footer />
        </footer>
    </>
    );
}

export default EditEvent;