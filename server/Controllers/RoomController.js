const cron = require('node-cron');
const Room = require('../models/RoomModel');
const Reservation = require('../models/ReservationModel');
const User = require('../models/UserModel');
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
  

//@desc check avialable rooms in a specified time interval
//@route POST /api/rooms/available
//@access public
const availabeRooms = asyncHandler(async (req, res) => {
  const { checkInDate, checkOutDate } = req.query;

  try {
    // Find available rooms that do not have any overlapping reservations
    const availableRooms = await Room.find({
      reserved: 0,
      'rooms.reservation': {
        $not: {
          $elemMatch: {
            $or: [
              { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } },
              { checkInDate: { $gte: checkInDate, $lte: checkOutDate } },
              { checkOutDate: { $gte: checkInDate, $lte: checkOutDate } },
            ],
          },
        },
      },
    });

    res.status(200).json( availableRooms );
  } catch (err) {
    const error = new Error('Internal Server Error');
    error.statusCode = 500;
    throw error;
  }
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
    const user = await User.findById(req.user._id);
    const roomId = parseInt(req.params.id);
  const roomNumber = parseInt(req.params.roomNumber);
  const room = await Room.findById(roomId);
  const { checkInDate, checkOutDate } = req.body;
  const specificRoom = room.rooms.find((room) => room.roomNumber === roomNumber);

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
    // Room reservation process to be done
    const reservation = new Reservation({
      room: room._id,
      checkInDate,
      checkOutDate,
    });

    const savedReservation = await reservation.save();

    specificRoom.reservation = savedReservation._id;
    room.available--;
    room.reserved++;

    await Promise.all([specificRoom.save(), room.save()]);

    user.reservation = savedReservation._id;
    await user.save();

    res.status(200).json({ msg: 'Room reserved successfully' });
  }
    
  });

//@desc cancel room reservation
//@route GET /api/rooms/:id/cancel
//@access private
const cancelReservation = asyncHandler(async (req, res) => {
    const reservationId = req.user.reservation;
    const user = await User.findById(req.user._id);


    if (!reservationId) {
      const error = new Error('User does not have an active reservation');
      error.statusCode = 400;
      throw error;
    }
  
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
  
    await Promise.all([reservation.remove(), specificRoom.save(), room.save()]);
  
    user.reservation = undefined;
    await user.save();
  
    res.status(200).json({ msg: 'Reservation cancelled successfully' });
  });


//@desc reserve room
//@route POST /api/rooms/reserveRoom/:id/:roomNumber
//@access public
  const PublicReserveRoom = async (req, res) => {
    const { checkInDate, checkOutDate, roomType } = req.body;
    try {
      // Find a room of the specified type with availability greater than 0
      const room = await Room.findOne({ type: roomType, available: { $gt: 0 } });
  
      if (!room) {
        return res.status(404).json({ error: 'No available rooms of the specified type' });
      }
  
      // Create a new reservation
      const reservation = new Reservation({
        room: room._id,
        checkInDate,
        checkOutDate,
      });
  
      // Save the reservation
      await reservation.save();
  
      // Update room availability
      room.available--;
      room.reserved++;
      await room.save();
  
      res.status(200).json({ message: 'Room reserved successfully', reservation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };  



//@desc cancel room reservation bvy checking if there are any expired reservations
//@route  no-routes its a cron-job runs periodically
//@access not-accessible to anyone
const cancelExpiredReservations = async () => {
    // Get current date
    const currentDate = new Date();
  
    try {
      // Find reservations where checkOutDate is before or equal to the current date
      const expiredReservations = await Reservation.find({
        checkOutDate: { $lte: currentDate }
      });
  
      // Process each expired reservation
      for (const reservation of expiredReservations) {
        const roomId = reservation.room;
        const room = await Room.findById(roomId);
        const specificRoom = room.rooms.find(
          (r) => r.reservation && r.reservation.toString() === reservation._id.toString()
        );
  
        // Remove reservation from specific room
        if (specificRoom) {
          specificRoom.reservation = undefined;
          room.available++;
          room.reserved--;
        }
  
        // Update room and user
        await Promise.all([specificRoom.save(), room.save()]);
        const user = await User.findOne({ reservation: reservation._id });
        if (user) {
          user.reservation = undefined;
          await user.save();
        }
  
        // Remove reservation from database
        await reservation.remove();
      }
    } catch (error) {   
      console.error('Error cancelling expired reservations', error);        
    }
  };
//Run the cancelExpiredReservations function every day at midnight
cron.schedule('0 0 * * *', cancelExpiredReservations);


module.exports = {
    getRooms,
    availabeRooms,
    specificRoom,
    reserveRoom,
    cancelReservation,
    PublicReserveRoom
}