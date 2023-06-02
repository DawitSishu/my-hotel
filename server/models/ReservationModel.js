const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true }
})
module.exports = mongoose.model('Reservation', reservationSchema);