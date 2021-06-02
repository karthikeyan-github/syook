const async = require("async");
const Persons = require("./personModel");

function logData(personObj, time) {
	async.eachSeries(Object.keys(personObj), (obj, callback) => {
		const newPerson = new Persons();
		newPerson.name = obj;
		newPerson.time = time;
		newPerson.stream = personObj[obj];
		newPerson.save(callback);
	});
};

exports.logData = logData;