CREATE DATABASE car_search;


CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    make VARCHAR(255),
    model VARCHAR(255),
    year INT,
    color VARCHAR(100),
    description TEXT,
    cost NUMERIC(10, 2)
);
