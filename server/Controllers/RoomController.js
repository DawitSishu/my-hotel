const Rooms = require('./Rooms.js');


//@desc get rooms
//@route GET /api/rooms?search=query&filter=parameter
//@access private
const getRooms = (req, res) => {
    let filteredRooms = [...Rooms];
  
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
  };

//@desc get avialable rooms
//@route GET /api/rooms/available
//@access private
const availabeRooms = (req,res) =>{
    const aviailableRoom = Rooms.filter(room => room.available > 0);
    res.json(aviailableRoom);
}

//@desc get a specific room
//@route GET /api/rooms/:id
//@access private
const specificRoom = (req,res) =>{
    const roomId = parseInt(req.params.id);
    const room = Rooms.find(room => room.id === roomId);

    if(!room){
        res.status(404);
        throw new Error("Room not found");
    }else{
        res.json(room);
    }

}

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