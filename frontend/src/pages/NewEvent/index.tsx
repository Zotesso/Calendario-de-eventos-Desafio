import React from 'react';

import Header from '../../components/header';
import EventController from '../../components/eventController';

import './styles.css';

const Home = () => { 
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

export default Home;