var dataBase = function(r) {
	this.r = r;
	var await = require('asyncawait/await');
	var async = require('asyncawait/async');

	return {
		getUser: async (function(name) {
			return r.table('users').filter(r.row("name").eq(name)).run();
		}),
		addCoef: async (function(devId, coef) {
			r.table('users').get(devId).update({
				ratioRage: r.row("ratioRage").append(coef)
			}).run()
		}),
		addTime: async (function(devId, timeObj) {
			r.table('users').get(devId).update({
				timeScope: r.row("timeScope").append(timeObj)
			}).run()
		}),
		addLastTask: async (function(devId, taskName) {
			r.table('users').get(devId).update({
				lastTask: taskName
			}).run()
		}),
		getCoefs: async (function(devId) {
			return r.table('users')
					.get(devId)
					.getField('ratioRage')
					.run();
		})
	};
};

module.exports = dataBase;