var model = require('../models/ticketsModel');

exports.getTotalGenereatedTicketsCount = async function (req, res, next) {
	const count = await model.getTotalRowCount();

	res.render('home', {
		totalCount: count,
	});
};
