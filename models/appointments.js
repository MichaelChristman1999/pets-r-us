const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let appointmentSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    service: { type: String, required: true}
});

// Exporting the model
module.exports = mongoose.model('Appointment', appointmentSchema);
