const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let appointmentSchema = new Schema({
    customerId: {type: String, unique: false, required: true},
    firstName: {type: String, unique: false, required: true},
    lastName: {type: String, unique: false, required: true},
    email: {type: String, unique: false, required: true},
    service: {type: String, unique: false, required: true}
})

module.exports = mongoose.model('Appointment', appointmentSchema);
