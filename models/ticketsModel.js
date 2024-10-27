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

exports.createNewTicket = async function (vatin, firstName, lastName) {
	try {
		// Insert data into the database
		await pool.query(
			`INSERT INTO ${process.env.DB_TABLE_NAME} (vatin, firstName, lastName) VALUES ($1, $2, $3)`,
			[vatin, firstName, lastName]
		);

		console.log('Data imported successfully!');
	} catch (error) {
		console.error('Error importing data:', error);
	} finally {
		// Close the database connection
		await pool.end();
	}
};
