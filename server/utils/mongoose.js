var mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb://localhost/OneMission');

let models_path = path.join(__dirname, './../models')

mongoose.Promise = global.Promise

fs.readdirSync(models_path).forEach(function (file) {
	if(file.indexOf('.js') >= 0){
		console.log(models_path+'/'+file);
		require(models_path+'/'+file)
	}
})

