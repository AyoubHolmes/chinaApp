const mongoose = require('mongoose');

mongoose
	//.connect('mongodb://68.183.103.73:27017/agencydb', {useNewUrlParser: true})
	//.connect('mongodb+srv://admin:azerty123@clustertest.k3rrx.mongodb.net/agencydb?retryWrites=true&w=majority', {useNewUrlParser: true})
	.connect('mongodb://127.0.0.1:27017/agencydb', {useNewUrlParser: true})
	.catch(e => console.log('Connection error', e.message))

const db = mongoose.connection;

module.exports = db;