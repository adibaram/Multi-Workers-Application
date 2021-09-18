const express = require('express');
const router = express.Router();
const csvController = require('./csv.controller');

router.get('/csv', csvController.getCsv);

module.exports = router;