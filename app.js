const express = require('express');
const app = express();
var path = require('path');
const { auth } = require('express-openid-connect');
require('dotenv').config();
const fs = require('fs');
const https = require('https');

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port =
	externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.SECRET,
	baseURL: externalUrl || `https://localhost:${port}`,
	clientID: process.env.CLIENT_ID,
	issuerBaseURL: 'https://dev-8y8lns3b8lke6ows.us.auth0.com',
	clientSecret: process.env.CLIENT_SECRET,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const homeRouter = require('./routes/home.routes');
const ticketsRouter = require('./routes/tickets.routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', homeRouter);
app.use('/tickets', ticketsRouter);

if (externalUrl) {
	const hostname = '0.0.0.0'; //ne 127.0.0.1
	app.listen(port, hostname, () => {
		console.log(
			`Server locally running at http://${hostname}:${port}/ and from outside on ${externalUrl}`
		);
	});
} else {
	https
		.createServer(
			{
				key: fs.readFileSync('server.key'),
				cert: fs.readFileSync('server.cert'),
			},
			app
		)
		.listen(port, function () {
			console.log(`Server running at https://localhost:${port}/`);
		});
}
