const express = require('express');
const rootRouter = require('./routes');

const app = express();

const bodyParser = express.json();
const staticMW = express.static('public');

app.use(bodyParser);
app.use(staticMW);
app.use('/api', rootRouter);


module.exports = app;

