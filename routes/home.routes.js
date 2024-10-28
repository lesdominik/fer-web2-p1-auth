var express = require('express');
var router = express.Router();
var controller = require('../controllers/homeController');

router.get('/', controller.getTotalGenereatedTicketsCount);

module.exports = router;
