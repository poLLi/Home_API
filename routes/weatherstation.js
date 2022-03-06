// Routing: WeatherStation
// ---------------------------------

import express from 'express';
let router = express.Router();

// POST testing
router.post('/test', (req, res) => {
    const data = req.body;
    console.log(data);

    res.send(data);
});

export default router;
