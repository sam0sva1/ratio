var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var ratio = require('./modules/ratioCounter.js');
var r = require('rethinkdbdash')({
	host: 'localhost',
	port: 28015,
	db: 'ratio'
});
var db = require('./modules/db.js')(r);

// var api = require("./api.js");
// var db = new api();

app.use(express.static('static/css'));
app.use(express.static('static/js'));

var handlebars = require('express-handlebars')
	.create({
		defaultLayout: 'main',
		extname: '.hbs'
	});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.set('port', process.argv[2] || 3000);

app.get('/', (req, res) => {
	res.render('ratio');
});

app.put('/ratio', jsonParser, (req, res) => {
	console.log(req.body);
	var info = req.body;

	db.getUser(info.dev).then(user => {
		var id = user[0].id;

		if(info.lastTask) {
			console.log('write lastTask');
			db.addLastTask(id, info.lastTask);
		}

		if(info.time) {
			console.log('write time');
			db.addLastTask(id, info.time);

			var coef = ratio.coef(info.time);
			db.addCoef(id, coef);
		}

		db.getCoefs(id).then(arrayOfCoefs => {
			var mainCoef = ratio.main(arrayOfCoefs);
			res.status(200).json(mainCoef);
		})
	});
});

app.listen(app.get('port'), function() {
	console.log(`Server works on ${app.get('port')}.`);
});