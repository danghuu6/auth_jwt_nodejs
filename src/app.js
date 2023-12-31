const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
dotenv.config();

const db = require('./config/db/index')
const route = require('./route/index.route')

db.connect()

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})