const express = require('express');

const eventController = require('./controllers/EventsController.js');
const routes = express.Router();

routes.get('/', eventController.index);

module.exports = routes;