const express = require('express');
const droneRoutes = require('./api/routes/droneRoutes');
const connection = require('./api/database/databaseConnection')
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//connect to the database
connection();


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})

app.use(droneRoutes);