// ---------------------------------------------------------------------------
// Entry Point

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import connectMongo from './database/dbConnect.js';

import weatherRouter from './routes/weather.routes.js';
import mainRouter from './routes/index.routes.js';

const app = express();

// ---------------------------------------------------------------------------
// Configure middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ---------------------------------------------------------------------------
// DB Connection
connectMongo();

// ---------------------------------------------------------------------------
// Routes
app.use('/', mainRouter);
app.use('/ws', weatherRouter);

// ---------------------------------------------------------------------------
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on Port: ${PORT}`));
