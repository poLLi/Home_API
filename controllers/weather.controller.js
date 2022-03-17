// ---------------------------------------------------------------------------
// WeatherStation Controller

import { weatherModel } from '../models/weatherData.model.js';
import moment from 'moment';

const weatherController = {};

weatherController.saveData = async (req, res, next) => {
    await weatherModel
        .create({
            sensor: req.body.sensor,
            token: req.body.token,
            temperatur: parseFloat(req.body.temp),
            humidity: parseFloat(req.body.hum),
            pressure: parseFloat(req.body.pres),
        })
        .then((value) => {
            res.status(200).send(value);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err._message);
        });
};

weatherController.getData = async (req, res, next) => {
    await weatherModel
        .find()
        .then((resonse) => {
            res.send(resonse);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err._message);
        });
};

weatherController.getLatest = async (req, res, next) => {
    const sensor = req.params.sensor;
    if (sensor) {
        await weatherModel
            .findOne({ sensor: sensor })
            .sort({ createdAt: -1 })
            .then((response) => {
                if (!response) res.status(404).send({ message: 'Did not find any Messurements from the Sensor: ' + sensor });
                else res.send(response);
            })
            .catch((err) => {
                res.status(500).send({ message: 'Error retrieving Messurements from Sensor: ' + sensor });
            });
    } else {
        await weatherModel
            .distinct('sensor')
            .then((response) => {
                console.log(response);

                weatherModel
                    .find({
                        sensor: { $in: response },
                        createdAt: {
                            $gte: moment().subtract(10, 'minutes'),
                            $lt: moment(),
                        },
                    })
                    .sort({ createdAt: -1 })
                    .then((data) => {
                        if (!data) res.status(404).send({ message: 'Did not find any Messurements' });
                        else res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({ message: 'Error retrieving Messurements' });
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

weatherController.getLastDay = async (req, res, next) => {
    const sensor = req.params.sensor;
    await weatherModel
        .find({
            sensor: sensor,
            createdAt: {
                $gte: moment().subtract(1, 'day'),
                $lt: moment(),
            },
        })
        .sort({ createdAt: -1 })
        .then((response) => {
            if (!response) res.status(404).send({ message: 'Did not find any Messurements from the Sensor: ' + sensor });
            else res.send(response);
        })
        .catch((err) => {
            res.status(500).send({ message: 'Error retrieving Messurements from Sensor: ' + sensor });
        });
};

weatherController.getLastMonth = async (req, res, next) => {
    const sensor = req.params.sensor;
    await weatherModel
        .find({
            sensor: sensor,
            createdAt: {
                $gte: moment().subtract(1, 'month'),
                $lt: moment(),
            },
        })
        .sort({ createdAt: -1 })
        .then((response) => {
            if (!response) res.status(404).send({ message: 'Did not find any Messurements from the Sensor: ' + sensor });
            else res.send(response);
        })
        .catch((err) => {
            res.status(500).send({ message: 'Error retrieving Messurements from Sensor: ' + sensor });
        });
};

weatherController.getLastYear = async (req, res, next) => {
    const sensor = req.params.sensor;
    await weatherModel
        .find({
            sensor: sensor,
            createdAt: {
                $gte: moment().subtract(1, 'year'),
                $lt: moment(),
            },
        })
        .sort({ createdAt: -1 })
        .then((response) => {
            if (!response) res.status(404).send({ message: 'Did not find any Messurements from the Sensor: ' + sensor });
            else res.send(response);
        })
        .catch((err) => {
            res.status(500).send({ message: 'Error retrieving Messurements from Sensor: ' + sensor });
        });
};

export default weatherController;
