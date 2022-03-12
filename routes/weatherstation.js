// Routing: WeatherStation
// ---------------------------------

import express from 'express';
import db from '../database/lowdb.js';
import moment from 'moment';
import _ from 'lodash';
import { weatherDataValidation } from '../validation/validation.js';

let router = express.Router();

//------------------------------------------------------------------
// POST /ws/saveData
// saving Weather Messurements in db
//------------------------------------------------------------------
router.post('/saveData', async (req, res) => {
    const err = weatherDataValidation(req.body);
    if (err) return res.status(500).send(err);

    const saveData = {
        time: moment().format(),
        token: req.body.token,
        temperatur: parseFloat(req.body.temp),
        humidity: parseFloat(req.body.hum),
        pressure: parseFloat(req.body.pres),
    };

    db.data.weather.push(saveData);
    await db
        .write()
        .then(() => {
            res.status(200).send(saveData);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

//------------------------------------------------------------------
// GET /ws/getLastest
// reciving Latest Weather Messurements
//------------------------------------------------------------------
router.get('/getLatest', async (req, res) => {
    const data = _.last(db.data.weather);
    if (!data) return res.status(500).send('error');

    res.status(200).send(data);
});

//------------------------------------------------------------------
// GET /ws/getLastDay
// reciving Weather Messurements for layst 24h
//------------------------------------------------------------------
router.get('/getLastDay', async (req, res) => {
    const data = _.filter(db.data.weather, (p) => {
        return p.time > moment().subtract(1, 'day').format();
    });

    res.status(200).send(data);
});

//------------------------------------------------------------------
// GET /ws/getLastMonth
// reciving Weather Messurements for layst month
//------------------------------------------------------------------
router.get('/getLastMonth', async (req, res) => {
    const data = _.filter(db.data.weather, (p) => {
        return p.time > moment().subtract(1, 'month').format();
    });

    res.status(200).send(data);
});

//------------------------------------------------------------------
// GET /ws/getLastYear
// reciving Weather Messurements for layst year
//------------------------------------------------------------------
router.get('/getLastYear', async (req, res) => {
    const data = _.filter(db.data.weather, (p) => {
        return p.time > moment().subtract(1, 'year').format();
    });

    res.status(200).send(data);
});

//------------------------------------------------------------------
// GET /ws/getAllData
// reciving all Weather Messurements
//------------------------------------------------------------------
router.get('/getAllData', async (req, res) => {
    res.status(200).send(db.data.weather);
});

export default router;
