const express = require('express');
const healthApi = express.Router();

healthApi.get('/', async (req, res) => {
    res.send('Hello Bello!').status(200);
});

module.exports = healthApi;