var developer = document.getElementById('dever');
var val_h = document.getElementById('val_h');
var val_m = document.getElementById('val_m');
var sp_h = document.getElementById('sp_h');
var sp_m = document.getElementById('sp_m');
var lastTask = document.getElementById('tasker');
var button = document.getElementById('mindIt');
var ratioHolder = document.getElementById('ratioHolder')

var formTime = function(h, m) {
	var time = 0;
	if(h) {
		time += +h * 60;
	}
	if(m) {
		time += +m;
	}
	return time;
}

var cleanFields = function() {
	val_h.value = '';
	val_m.value = '';
	sp_h.value = '';
	sp_m.value = '';
	lastTask.value = '';
}

putInfo = function(url, object) {

  return new Promise(function(resolve, reject) {

    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	var bodyToSend = JSON.stringify(object);

	xhr.open('PUT', url, true);
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	xhr.onload = function() {
    	if (this.status == 200) {
    		resolve(this.responseText);
    	} else {
    		var error = new Error(this.statusText);
    		error.code = this.status;
    		reject(error);
    	}
    };
		xhr.send(bodyToSend);
  });
};

var mindItHandler = function() {
	var data = {};
	data.dev = developer.value;

	if(val_h.value || val_m.value || sp_h.value || sp_m.value) {
		data.time = {};
		data.time.val_time = formTime(val_h.value, val_m.value);
		data.time.sp_time = formTime(sp_h.value, sp_m.value);
	}

	if(lastTask.value !== '') {
		console.log(lastTask.value);
		data.lastTask = lastTask.value;
	}


		putInfo('/ratio', data).then(function(result) {
			ratioHolder.innerHTML = result;
		});


	cleanFields();
}

button.onclick = mindItHandler;
developer.onchange = function() {
	cleanFields();
	ratioHolder.innerHTML = '_';
}