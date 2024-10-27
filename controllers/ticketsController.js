var model = require('../models/ticketsModel');

exports.generateNewTicket = async function (req, res, next) {
	const { vatin, firstName, lastName } = req.body;

	if (!vatin || !firstName || !lastName) {
		return res.status(400).json({
			error: 'JSON lacks required data.',
			description:
				'To generate new ticket, JSON must contain ALL of the specified fields: vatin, firstName, and lastName.',
		});
	} else if (!/^\d{11}$/.test(vatin)) {
		return res.status(400).json({
			error: 'Invalid OIB format.',
			description: 'OIB consists of 11 digits.',
		});
	}

	try {
		const count = await model.getVatinRowCount(vatin);

		if (count >= 3) {
			return res.status(400).json({
				error: 'The maximum number of tickets with that OIB has been reached.',
				description:
					'It is possible to generate a maximum of 3 tickets with the same OIB.',
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: 'Error occured while checking given vatin row count',
		});
	}

	try {
		const generatedUUID = await model.createNewTicket(
			vatin,
			firstName,
			lastName
		);
		res.send(generatedUUID);
	} catch (error) {
		return res
			.status(500)
			.json({ error: 'Error occured while importing data' });
	}

	//ako je sve okej onda pošalji na model i dohvati uuid i iz njega izgeneriraj qr kod
};

exports.getTicket = async function (req, res, next) {
	let id = req.params.id;

	try {
		const ticket = await model.getTicket(id);

		if (!ticket) {
			return res.send('no ticket with given id.');
		}

		return res.send(ticket);
	} catch (error) {
		return res.status(500).json({
			error: 'Error occured while getting ticket with given id',
		});
	}
};
