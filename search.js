const express = require('express');
const router = express.Router();
const pool = require('../db/postgres');
const Car = require('../models/Car');
const { logSearch } = require('../utils/logger');

router.get('/', async (req, res) => {
    const { query, db, userId } = req.query;

    if (!query || !userId) {
        return res.status(400).send('Query and user ID are required');
    }

    // Log the search query
    logSearch(userId, query);

    try {
        let results = [];

        if (db === 'postgres' || db === 'both') {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM cars WHERE make ILIKE $1 OR model ILIKE $1 OR color ILIKE $1', [`%${query}%`]);
            results.push(...result.rows);
            client.release();
        }

        if (db === 'mongodb' || db === 'both') {
            const cars = await Car.find({ $or: [{ make: new RegExp(query, 'i') }, { model: new RegExp(query, 'i') }, { color: new RegExp(query, 'i') }] });
            results.push(...cars);
        }

        res.render('results', { results });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;