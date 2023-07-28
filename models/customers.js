const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a new mongoose model named Customer
let customerSchema = new Schema({
    customerId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    agree: { type: String }
});

// Exporting the model
module.exports = mongoose.model('Customer', customerSchema);
