const express = require('express');
const droneRoutes = require('./api/routes/droneRoutes');
const connection = require('./api/database/databaseConnection')
const logger = require('./api/log/droneBatteryLog')
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static('uploads'))
app.use(express.urlencoded({extended: true}));

//connect to the database
connection();
logger();

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})

app.use(droneRoutes);