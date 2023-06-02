const Rooms = require('./Rooms.js');
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
//@route POST /api/rooms/:id/reserve
//@access private
const reserveRoom = (req,res) =>{
    const roomId = parseInt(req.params.id);
    const room = Rooms.find(room => room.id === roomId);
    
    if(!room){
        res.status(404);
        throw new Error("Room not found");
    }else if(room.available <= 0){
        res.status(400);
        throw new Error("Room-type is fully booked")
    }else{
        //room reservation process to be done
        room.available--;
        room.reserved++;    
        res.status(200).json({msg:"room reserved successfully"});
    }
}

//@desc cancel room reservation
//@route GET /api/rooms/:id/cancel
//@access private
const cancelReservation = (req,res) =>{
    const roomId = parseInt(req.params.id);
    const room = Rooms.find(room => room.id === roomId);

    if(!room){
        res.status(404);
        throw new Error("Room not found");
    }else if(room.reserved <= 0){
        res.status(400);
        throw new Error("Room is not booked")
    }else{
        //room reservation cancel process to be done
        room.available++;
        room.reserved--;    
        res.status(200).json({msg:"room reservation canceled  successfully"});
    }

}

module.exports = {
    getRooms,
    availabeRooms,
    specificRoom,
    reserveRoom,
    cancelReservation
}