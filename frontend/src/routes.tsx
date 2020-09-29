import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserEvents from './pages/UserEvents';
import AllEvents from './pages/AllEvents';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Home}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/myevents" component={UserEvents}/>
            <Route path="/events" component={AllEvents}/>
        </BrowserRouter>
    );
}

export default Routes;