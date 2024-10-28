var express = require('express');
var router = express.Router();
var controller = require('../controllers/ticketsController');
const { requiresAuth } = require('express-openid-connect');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri:
			'https://dev-8y8lns3b8lke6ows.us.auth0.com/.well-known/jwks.json',
	}),
	audience: 'https://fer-web2-p1-auth.onrender.com/tickets/generate-new',
	issuer: 'https://dev-8y8lns3b8lke6ows.us.auth0.com',
	algorithms: ['RS256'],
});

// router.get('/') - napravi jednostavan view gdje piše da nije moguć pregled svih generiranih karata i back to homepage
router.post('/generate-new', checkJwt, controller.generateNewTicket);
router.get(
	'/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})',
	requiresAuth(),
	controller.getTicket
);

module.exports = router;
