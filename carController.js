const { getCarById, searchCars } = require('../models/postgresQueries');
const { getCarByIdMongo, searchCarsMongo } = require('../models/mongoQueries');

exports.getCar = async (req, res) => {
    const { id, db } = req.query;
    let car;
    if (db === 'postgres') {
        car = await getCarById(id);
    } else if (db === 'mongo') {
        car = await getCarByIdMongo(id);
    }
    res.render('carDetail', { car });
};

exports.search = async (req, res) => {
    const { query, db } = req.query;
    let cars;
    if (db === 'postgres') {
        cars = await searchCars(query);
    } else if (db === 'mongo') {
        cars = await searchCarsMongo(query);
    }
    res.render('carList', { cars });
};