const express = require('express');
let router = express.Router();
const csvRouter = require('./csv/csv.router');

router.get('/', (req, res) => {
  return res.send('server');
});

router.use('', csvRouter);

module.exports = router;