const Room = require('../models/RoomModel');
const Reservation = require('../models/ReservationModel');
const asyncHandler = require('express-async-handler');


//@desc get rooms
//@route GET /api/rooms?search=query&filter=parameter
//@access private
const getRooms = asyncHandler(async (req, res) => {
    let filteredRooms = await Room.find({});
  
    // Search rooms based on the 'search' query parameter
    if (req.query.search) {
      const searchQuery = req.query.search.toLowerCase();
      filteredRooms = filteredRooms.filter(room =>
        room.type.toLowerCase().includes(searchQuery)
      );
    }
  
    // Filter rooms based on the 'filter' query parameter
    if (req.query.filter) {
      const filterParams = req.query.filter.split(',');
      filteredRooms = filteredRooms.map(room =>
        filterParams.reduce((filteredRoom, param) => {
          filteredRoom[param] = room[param];
          return filteredRoom;
        }, {})
      );
    }
  
    res.json(filteredRooms);
  });
  

//@desc get avialable rooms
//@route GET /api/rooms/available
//@access private
const availabeRooms = asyncHandler(async (req, res) => {
    // Find rooms with availability greater than 0
    const availableRooms = await Room.find({ available: { $gt: 0 } });
  
    res.json(availableRooms);
  });

//@desc get a specific room
//@route GET /api/rooms/:id
//@access private
const specificRoom = asyncHandler( async (req,res) =>{
    try {
        const roomId = req.params.roomId;
    
       const room = await Room.findById(roomId);
    
        if (!room) {
          const error = new Error('Room not found');
          error.statusCode = 400;
          throw error;
        }
    
        res.json(room);
      } catch (error) {
            throw new Error("Something went wrong");
      }

});

//@desc reserve room
//@route POST /api/rooms/:id/reserve/:roomNumber
//@access private
const reserveRoom = asyncHandler(async (req, res) => {
    const roomId = parseInt(req.params.id);
    const roomNumber = parseInt(req.params.roomNumber);
    const room = await Room.findById(roomId);
    const { checkInDate, checkOutDate } = req.body;
    const specificRoom = room.rooms.find((r) => r.roomNumber === roomNumber);
  
    if (!room) {
      const error = new Error('Room not found');
      error.statusCode = 404;
      throw error;
    } else if (room.available <= 0) {
      const error = new Error('Room-type is fully booked');
      error.statusCode = 400;
      throw error;
    } else if (!specificRoom) {
      const error = new Error('RoomNumber not found');
      error.statusCode = 404;
      throw error;
    } else {
      const reservation = new Reservation({
        room: room._id,
        checkInDate,
        checkOutDate,
      });
      const savedReservation = await reservation.save();
      specificRoom.reservation = savedReservation._id; // Update the specific room's reservation
      room.available--;
      room.reserved++;
      await room.save();
      res.status(200).json({ msg: 'Room reserved successfully' });
    }
  });

//@desc cancel room reservation
//@route GET /api/rooms/:id/cancel
//@access private
const cancelReservation = asyncHandler(async (req, res) => {
    const reservationId = req.params.id;
    const reservation = await Reservation.findById(reservationId);
  
    if (!reservation) {
      const error = new Error('Reservation not found');
      error.statusCode = 404;
      throw error;
    }
  
    const room = await Room.findById(reservation.room);
  
    if (!room) {
      const error = new Error('Room not found');
      error.statusCode = 404;
      throw error;
    }
  
    const specificRoom = room.rooms.find((r) => r.reservation && r.reservation.toString() === reservationId);
  
    if (!specificRoom) {
      const error = new Error('Room associated with reservation not found');
      error.statusCode = 404;
      throw error;
    }
  
    specificRoom.reservation = undefined; // Remove the reservation ID from the specific room
    room.available++;
    room.reserved--;
  
    await Promise.all([reservation.remove(), room.save()]);
  
    res.status(200).json({ msg: 'Reservation cancelled successfully' });
  });

module.exports = {
    getRooms,
    availabeRooms,
    specificRoom,
    reserveRoom,
    cancelReservation
}