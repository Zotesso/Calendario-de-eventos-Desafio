import React from 'react';

import Header from '../../components/header';
import EventController from '../../components/eventController';

import './styles.css';

const NewEvent = () => { 
    return (
        <>
        <header>
            <Header />
        </header>
        <main>
            <EventController />
        </main>
    </>
    );
}

export default NewEvent;