const express = require('express');

const eventController = require('./controllers/EventsController.js');
const userController = require('./controllers/UsersController.js');
const loginController = require('./controllers/LoginController.js');

const routes = express.Router();

routes.get('/users', userController.index);
routes.post('/users', userController.create);

routes.post('/login', loginController.login);

module.exports = routes;