var r = require('rethinkdbdash')({
	host: 'localhost',
	port: 28015,
	db: 'ratio'
});
var db = require('./modules/db.js')(r);

// var ar = ["dkasyanov", "vtrebushnoy", "knovosad", "dglotov"];
// ar.forEach(dev => {
// 	r.table('users').insert({
// 		name: dev,
// 		ratioRage: [],
// 		timeScope: [],
// 		lastTask: ''
// 	}).run().then(res => console.log(res));
// });

db.getUser('knovosad').then(res => db.getCoefs(res[0].id).then(result => console.log(result)));