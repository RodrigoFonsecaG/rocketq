const express = require('express');
const { route } = require('express/lib/router');
const routes = express.Router();

const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

routes.get('/', QuestionController.index)
routes.post('/question/:id/:question/:action', QuestionController.post);
routes.post('/question/create/:id', QuestionController.create)


routes.get('/create', RoomController.createForm)
routes.post('/create-room', RoomController.create);
routes.get('/room/:id', RoomController.open);
routes.post('/enter-room', RoomController.enter)


module.exports = routes;