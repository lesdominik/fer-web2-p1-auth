var express = require('express');
var router = express.Router();
var controller = require('../controllers/ticketsController');

router.post('/generate-new', controller.generateNewTicket);

module.exports = router;
