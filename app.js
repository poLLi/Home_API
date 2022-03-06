import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import wsRouter from './routes/weatherstation.js';

const app = express();
const port = 3000;

// Setup App Middleware
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
app.use('/', indexRouter);
app.use('/ws', wsRouter);

// Start App
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
