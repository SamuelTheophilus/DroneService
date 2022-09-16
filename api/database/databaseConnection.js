require('dotenv').config();
const mongoose = require('mongoose');

dbURI = process.env.dbURI


const connection = async () => {
  await mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { console.log('Database Connected Successfully') })
    .catch((error) => { console.log(error) })

}




module.exports = connection;