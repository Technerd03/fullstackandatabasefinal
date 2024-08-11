const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');
const usersRouter = require('./routes/users');

// Initialize Express app
const app = express();

// Connect to PostgreSQL
const pool = new Pool({
    user: 'your_pg_user',
    host: 'localhost',
    database: 'your_pg_db',
    password: 'your_pg_password',
    port: 5432,
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_mongo_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/users', usersRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});