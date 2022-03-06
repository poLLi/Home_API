// Routing: Index
// ---------------------------------

import express from 'express';
let router = express.Router();

// GET Homepage
router.get('/', (req, res) => {
    res.send('Hello World!');
});

export default router;
