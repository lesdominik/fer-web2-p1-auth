exports.generateNewTicket = function (req, res, next) {
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

	//provjeri s modelom postoje li već 3 ulaznice s istim OIB-om

	//ako je sve okej onda pošalji na model i dohvati uuid i iz njega izgeneriraj qr kod
	console.log(req.body);
	console.log('sve je okej s ulaznim jsonom');
	res.send('Sve je okej!');
};
