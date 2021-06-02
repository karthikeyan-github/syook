// import the necessary modules
const mongoose = require('mongoose');

const StreamDetailSchema = new mongoose.Schema({
	name: String,
	origin: String,
	destination: String,
	timestamp: Date
});

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: Date,
    stream: [StreamDetailSchema]
});

module.exports = mongoose.model('Person', PersonSchema);