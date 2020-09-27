const express = require('express');

const eventController = require('./controllers/EventsController.js');
const userController = require('./controllers/UsersController.js');

const routes = express.Router();

routes.get('/users', userController.index);
routes.post('/users', userController.create);

module.exports = routes;