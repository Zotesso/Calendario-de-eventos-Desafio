import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import UserEvents from './pages/UserEvents';
import AllEvents from './pages/AllEvents';
import NewEvent from './pages/NewEvent';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={AllEvents}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/myevents" component={UserEvents}/>
            <Route path="/new" component={NewEvent}/>
        </BrowserRouter>
    );
}

export default Routes;