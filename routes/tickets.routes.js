var express = require('express');
var router = express.Router();

router.post('/generate-new', function (req, res, next) {
	console.log(req.body);
});