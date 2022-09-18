const express = require('express');
const app = express();
const droneRoutes = require('./api/routes/droneRoutes');
const connection = require('./api/database/databaseConnection')
const logger = require('./api/log/droneBatteryLog')
const dbpopulate = require('./api/db/dbpopulate')
const PORT = 5000;

app.use(express.json());
app.use(express.static('uploads'))
app.use(express.urlencoded({extended: true}));

//connect to the database
connection();

//uploading into the database
dbpopulate.droneUploads();

//logger function to check drone battery levels
logger();

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})

app.use(droneRoutes);