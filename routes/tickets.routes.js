var express = require('express');
var router = express.Router();
var controller = require('../controllers/ticketsController');

// router.get('/') - napravi jednostavan view gdje piše da nije moguć pregled svih generiranih karata i back to homepage
router.post('/generate-new', controller.generateNewTicket);
router.get(
	'/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})',
	controller.getTicket
);

module.exports = router;
