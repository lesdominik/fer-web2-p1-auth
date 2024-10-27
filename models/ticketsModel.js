const pool = require('../config/db');
require('dotenv').config();

exports.getTotalRowCount = async function () {
	try {
		const result = await pool.query(
			`SELECT COUNT(*) AS count FROM ${process.env.DB_TABLE_NAME}`
		);
		console.log(result.rows[0].count);
		return result.rows[0].count;
	} catch (error) {
		console.error('Error fetching row count:', error);
		throw error;
	}
};

exports.getVatinRowCount = async function (vatin) {
	try {
		const result = await pool.query(
			`SELECT COUNT(*) AS count FROM ${process.env.DB_TABLE_NAME} WHERE vatin = $1`,
			[vatin]
		);
		return parseInt(result.rows[0].count, 10); // Convert count to a number
	} catch (error) {
		console.error('Error checking row count:', error);
		throw error; // Rethrow the error to be handled upstream
	}
};

exports.createNewTicket = async function (vatin, firstName, lastName) {
	try {
		const result = await pool.query(
			`INSERT INTO ${process.env.DB_TABLE_NAME} (vatin, firstName, lastName) VALUES ($1, $2, $3) RETURNING id`,
			[vatin, firstName, lastName]
		);

		const generatedUUID = result.rows[0].id;
		console.log(`Inserted ticket with UUID: ${generatedUUID}`);

		console.log('Data imported successfully!');
		return generatedUUID;
	} catch (error) {
		console.error('Error importing data:', error);
	}
};
