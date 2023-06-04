const express = require("express");
const userAuthChecker = require('../Middlewares/userAuthChecker');

const {
    getRooms,
    availabeRooms,
    specificRoom,
    reserveRoom,
    cancelReservation,
    PublicReserveRoom
} = require('../Controllers/RoomController')

const router = express.Router();


//get all rooms
router.get('/?search=query&filter=parameter',userAuthChecker,getRooms);

//get available rooms
router.post('/available',availabeRooms);


//get specific room
router.get('/:id',specificRoom)

//reserve a room
router.post('/:id/reserve/:roomNumber',userAuthChecker,reserveRoom)

//cancel reservation
router.post('/:id/cancel',userAuthChecker,cancelReservation)

//reserve a room publickly
router.post('/reserveRoom/:id/:roomNumber',PublicReserveRoom)



module.exports = router;
