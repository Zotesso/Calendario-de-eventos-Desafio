import React from 'react';

import Header from '../../components/header';
import EventController from '../../components/eventController';

import './styles.css';
import Footer from '../../components/footer';

const NewEvent = () => { 
    return (
        <>
        <header>
            <Header />
        </header>
        <main>
            <EventController 
            title='' 
            description='' 
            eventStartTime={new Date()} 
            eventEndTime={new Date()}
            visibility='private' 
            />
        </main>
        <footer>
          <Footer />
        </footer>
    </>
    );
}

export default NewEvent;