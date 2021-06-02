module.exports = {
	socketOptions: {
		port: 9898
	},
	transmissionDelay: 1, // mins
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
	},
	seperator: "|",
	uniqueNames: [
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
	],
	numberOfEncryption: {
		min: 5,
		max: 10
	}
};