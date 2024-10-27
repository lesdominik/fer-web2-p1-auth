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
			description:
				'OIB consists of 11 digits. You entered one or more non-digit characters.',
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
		return res.status(500).json({ error: 'Error checking vatin count' });
	}

	const generatedUUID = await model.createNewTicket(
		vatin,
		firstName,
		lastName
	);
	res.send(generatedUUID);

	// model.getTotalRowCount();

	//ako je sve okej onda pošalji na model i dohvati uuid i iz njega izgeneriraj qr kod
	// console.log(req.body);
	// res.send('Sve je okej!');
};
