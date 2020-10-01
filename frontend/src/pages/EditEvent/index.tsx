import React, { useEffect } from 'react';

import Header from '../../components/header';
import EventController from '../../components/eventController';

import {RouteComponentProps, useHistory}  from 'react-router-dom';
import './styles.css';

const EditEvent = (props: RouteComponentProps) => { 
    const state = props.location.state;
    const history = useHistory();

    return (
        <>
        <header>
            <Header />
        </header>
        <main>
        {props.location.state != undefined &&
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
    </>
    );
}

export default EditEvent;