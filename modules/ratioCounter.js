var ratio = {};

ratio.coef  = function(time) {
	var val_t = time.val_time,
		sp_t = time.sp_time,
		div = sp_t / val_t;
	return +div.toFixed(1);
};

ratio.main = function(arrayOfCoefs) {
	//if(!arrayOfCoefs.length) return 1;

	var sum = 0;
	arrayOfCoefs.forEach(coef => {
		sum += coef;
	});
	var div = sum / arrayOfCoefs.length;
	return +div.toFixed(1);
}

module.exports = ratio;