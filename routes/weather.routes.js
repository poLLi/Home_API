// ---------------------------------------------------------------------------
// WeatherStation Routes

import express from 'express';
import weatherController from '../controllers/weather.controller.js';
const weatherRouter = express.Router();

// ---------------------------------------------------------------------------
// Save Weather Data
weatherRouter.post('/saveData', weatherController.saveData);

weatherRouter.get('/getData', weatherController.getData);
weatherRouter.get('/getLatest/', weatherController.getLatest);
weatherRouter.get('/getLatest/:sensor', weatherController.getLatest);
weatherRouter.get('/getLastDay/:sensor', weatherController.getLastDay);
weatherRouter.get('/getLastMonth/:sensor', weatherController.getLastMonth);
weatherRouter.get('/getLastYear/:sensor', weatherController.getLastYear);

export default weatherRouter;
