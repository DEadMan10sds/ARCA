/* GLOBALS */
const express = require('express');
const app = express();
const cors = require('cors');


//Hace un parse para la transmisión de datos en formato json
app.use(express.json());
app.use(cors());

const db = require('./models');

const eventsRouter = require('./routes/Events');
app.use('/events', eventsRouter);

const usersRouter = require('./routes/Users');
app.use('/users', usersRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001');
    });
});