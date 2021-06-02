const appUtils = require('./../utils');

const uniqueNames = [
	["Ned", "Bengaluru", "Mumbai"],
	["Arya", "Mumbai", "Chennai"],
	["Jon Snow", "Chennai", "Delhi"],
	["Daenerys", "Delhi", "Kolkata"],
	["Tyrion", "Kolkata", "Pune"],
	["Cersei", "Pune", "Goa"],
	["Sansa", "Goa", "Hydrabad"],
	["Jaime", "Hydrabad", "Kochi"],
	["Robb", "Kochi", "Ahmedabad"],
	["Bran", "Ahmedabad", "Punjab"]
];

function getRandomPerson() {
	return uniqueNames[appUtils.getRandomInt(0, uniqueNames.length - 1)];
};

exports.getRandomPerson = getRandomPerson;