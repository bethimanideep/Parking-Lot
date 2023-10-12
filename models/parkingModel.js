const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
  slotNumber: {
    type: String,
    unique: true,
  },
  carNumber: {
    type: String,
    unique: true,
  },
}, { versionKey: false });

const Parking = mongoose.model('Parking', parkingSchema);

module.exports = Parking;
