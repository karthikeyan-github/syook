const net = require('net');
const appUtils = require('./app/utils');
const appConstants = require('./config/constants');
const emitterConfig = require('./app/emitter/config');
const Person = require('./app/emitter/person');
const personPool = require('./app/emitter/personPool');

const emitter = net.createConnection(appConstants.socketOptions, createString);
let numberOfRetry = 0;

emitter.on(`close`, _ => {
	++numberOfRetry;
	if (numberOfRetry > emitterConfig.numberOfConnectionRetry) {
		console.log(`Connection Closed...!`);
		process.exit();
	}
	else {
		console.log(`Connection Retrying...!`);
		setTimeout(reEstablishConnection, 3000);
	}
});

function reEstablishConnection() {
	if (!emitter) {
		console.log(`Connection object not found...!`);
		return;
	}

	emitter.connect(appConstants.socketOptions.port, _ => {
		numberOfRetry = 0;
		console.log(`Sending Data`);
	});
};

emitter.on(`error`, err => {
	console.log(`Data transmission failed..!`);
});

function createString() {
	if (!emitter) return;

	let dataString = "",
	numberOfEncryption = appUtils.getRandomInt(
		emitterConfig.numberOfEncryption.min, 
		emitterConfig.numberOfEncryption.max
	);

	console.log('numberOfEncryption => ', numberOfEncryption);
	for (let i = 0; i < numberOfEncryption; i++) {
		let person = new Person(...personPool.getRandomPerson());
		let encryptedString = appUtils.encrypt(person);
		dataString += ((dataString && dataString.length && emitterConfig.seperator || "") + encryptedString);
	}

	emitter.write(dataString);
	// setTimeout(createString, appConstants.transmissionDelay * 60 * 1000);
	setTimeout(createString, 10000);
};