const express = require('express');
const fs      = require('fs');
const axios   = require('axios');
const bp      = require('body-parser');
const ObjectsToCsv = require('objects-to-csv');
const util = require('util')
const btoa = require('btoa')
// const getArticle = require('./axiosCalls');

const routes = require('./server/routes/routes');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 1234;

app.use(bp.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 1000000
}));
app.use(bp.json({
    limit: '50mb'
}));

app.use(routes);

app.listen(PORT, function () {
    console.log("App listening at http://localhost:" + PORT);
})