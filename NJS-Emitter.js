const net = require('net');
const appUtils = require('./app/utils');
const appConstants = require('./config/constants');
const emitterConfig = require('./app/emitter/config');
const Person = require('./app/emitter/person');
const personPool = require('./app/emitter/personPool');

let numberOfRetry = 0;

const emitter = net.createConnection(appConstants.socketOptions, createString);

emitter.on(`close`, _ => {
	if (numberOfRetry > emitterConfig.maxNumberOfReconnect) {
		console.log(`Connection Closed...!`);
		process.exit();
	}
	else {
		++numberOfRetry;
		console.log(`Reconnecting...!`);
		setTimeout(reEstablishConnection, emitterConfig.reconnectDuration * 1000);
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

	for (let i = 0; i < numberOfEncryption; i++) {
		let person = new Person(...personPool.getRandomPerson());
		let encryptedString = appUtils.encrypt(person);
		dataString += ((dataString && dataString.length && emitterConfig.seperator || "") + encryptedString.toString());
	}

	emitter.write(dataString);
	setTimeout(createString, emitterConfig.transmissionDelay * 60 * 1000);
};