const express = require('express');
const app = express();
var path = require('path');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.SECRET,
	baseURL: 'https://fer-web2-p1-auth.onrender.com',
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

app.listen(3030, () => {
	console.log('App is running on port 3030');
});
