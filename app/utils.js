const crypto = require('crypto');
const appConstants = require('./../config/constants');

function getRandomInt(min, max) {
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function decrypt(data) {
	return crypto.createDecipher(appConstants.decryption.algorithm, appConstants.decryption.passkey)
	.update(data, ...appConstants.decryption.updateOptions);
};

function encrypt(data) {
	return crypto.createCipher(appConstants.encryption.algorithm, appConstants.encryption.passkey)
	.update(JSON.stringify(data), ...appConstants.encryption.updateOptions);
};

function createSHA256Hash(data) {
	return crypto.createHash(appConstants.hash.algorithm).
	update(JSON.stringify(data)).
	digest(appConstants.hash.digest);
};

exports.getRandomInt = getRandomInt;
exports.createSHA256Hash = createSHA256Hash;
exports.encrypt = encrypt;
exports.decrypt = decrypt;