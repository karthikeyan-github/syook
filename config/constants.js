module.exports = {
	socketOptions: {
		port: 9898
	},
	encryption: {
		algorithm: "aes-256-ctr",
		passkey: "syook",
		updateOptions: ['utf8', 'hex']
	},
	decryption: {
		algorithm: "aes-256-ctr",
		passkey: "syook",
		updateOptions: ['hex', 'utf8']
	},
	hash: {
		algorithm: "sha256",
		digest: "hex"
	}
};