const express = require('express');

const eventController = require('./controllers/EventsController.js');
const userController = require('./controllers/UsersController.js');
const loginController = require('./controllers/LoginController.js');

const routes = express.Router();

routes.get('/users', userController.index);
routes.post('/users', userController.create);

routes.post('/login', loginController.login);

routes.get('/events/:visibility/:id?', eventController.index);
routes.post('/events', eventController.create);
routes.put('/events', eventController.update);
routes.delete('/events/:id', eventController.delete);

module.exports = routes;