const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));





app.listen(PORT, () => {
  console.log('App is listening on port 8000')
})