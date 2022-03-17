// ---------------------------------------------------------------------------
// Index Routes

import express from 'express';
const mainRouter = express.Router();

// ---------------------------------------------------------------------------
// Create a new Tutorial TEST
mainRouter.get('/', async (req, res, next) => {
    res.json({ message: 'Hello World.' });
});

export default mainRouter;
