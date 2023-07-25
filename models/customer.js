const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let customerSchema = new Schema({
    customerId: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true}
})

module.exports = mongoose.model('Customer', customerSchema);
