// Routing: WeatherStation
// ---------------------------------

import express from 'express';
import db from '../database/lowdb.js';
import moment from 'moment';
import _ from 'lodash';
import { weatherDataValidation } from '../validation/validation.js';

let router = express.Router();

// POST testing
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
            console.log('done', saveData);
            res.status(200).send(saveData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('something went wrong!');
        });
});

router.get('/getLatest', async (req, res) => {
    const data = _.last(db.data.weather);
    if (!data) return res.status(500).send('error');

    console.log(data);
    res.status(200).send(data);
});

router.get('/getLastDay', async (req, res) => {
    const data = _.filter(db.data.weather, (p) => {
        return p.time > moment().subtract(1, 'day').format();
    });

    console.log(data);
    res.status(200).send(data);
});

router.get('/getLastMonth', async (req, res) => {
    const data = _.filter(db.data.weather, (p) => {
        return p.time > moment().subtract(1, 'month').format();
    });

    console.log(data);
    res.status(200).send(data);
});

router.get('/getLastYear', async (req, res) => {
    const data = _.filter(db.data.weather, (p) => {
        return p.time > moment().subtract(1, 'year').format();
    });

    console.log(data);
    res.status(200).send(data);
});

router.get('/getAllData', async (req, res) => {
    const data = db.data.weather;

    console.log(data);
    res.status(200).send(data);
});

export default router;
