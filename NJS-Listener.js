const net = require('net');
const async = require('async');
const mongoose = require("mongoose");
const PersonRoute = require('./app/listener/person');
const appConstants = require('./config/constants');
const listenerConfig = require('./app/listener/config');
const appUtils = require('./app/utils');
const db = require('./config/db');

let isDataReceiving = false;

const listener = net.createServer(async socket => {
	try {
		await mongoose.connect(db.url);
		socket.on(`data`, startScripting);
		socket.on(`error`, error => {
			isDataReceiving = false;
			console.log(`No data receving. Still Listening..!`);
			setTimeout(closeServer, 5000);
		});
	}
	catch (e) {
		console.log(`Error while creating server...!`);
	}
});

listener.listen(appConstants.socketOptions.port, _ => {
	console.log(`Listening on: ${listener.address().port}`);
});

function closeServer() {
	if (!listener || isDataReceiving) return;
	console.log(`Close Listening. Good Bye...`);
	listener.close();
	process.exit();
};

function startScripting(encryptedString) {
	if (!encryptedString || (encryptedString && !encryptedString.length)) return;
	isDataReceiving = true;
	console.log(`Receving Data`);
	const personObj = {},
	splitedEncryptString = encryptedString.toString().split(listenerConfig.seperator);

	for (let s of splitedEncryptString) {
		let decryptedString = appUtils.decrypt(s);
		try {
			let decryptedObj = JSON.parse(decryptedString);
			let secretKeyFromDecrptedObj = decryptedObj["secretkey"];
			delete decryptedObj.secretkey;

			let secretKey = appUtils.createSHA256Hash(decryptedObj);
			if (secretKeyFromDecrptedObj.toString() === secretKey.toString()) {
				decryptedObj.timestamp = new Date();
				if (!personObj[decryptedObj["name"]]) {
					personObj[decryptedObj["name"]] = [decryptedObj];
					continue;
				}
				personObj[decryptedObj["name"]].push(decryptedObj);
			}
		}
		catch (e) {
			console.log(`Data Loss...!`);
		}
	}

	PersonRoute.logData(personObj, new Date());
};