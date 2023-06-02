const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    type: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Number, required: true },
  reserved: { type: Number, required: true },
  rooms: [
    {
      roomNumber: { type: String, required: true, unique: true },
      reserved: { type: Boolean, required: true },
    }
  ]
});

module.exports = mongoose.model('Room', roomSchema);