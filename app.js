const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const homeRouter = require('./routes/home.routes');
const ticketsRouter = require('./routes/tickets.routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', homeRouter);
app.use('/tickets', ticketsRouter);

app.listen(3030);
