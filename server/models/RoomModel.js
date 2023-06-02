const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    type: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Number, required: true },
  reserved: { type: Number, required: true },
  rooms: [
    {
      roomNumber: { type: Number, required: true, unique: true },
      reserved: { type: Boolean, required: true },
      reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }
    }
  ]
});

module.exports = mongoose.model('Room', roomSchema);