const appUtils = require('./../utils');

class Person {
	constructor (name, origin, destination) {
		this.name = name;
		this.origin = origin;
		this.destination = destination;
		this.secretkey = appUtils.createSHA256Hash(this)
	}
};

module.exports = Person;