const express = require("express");

const {
    getRooms,
    availabeRooms,
    specificRoom,
    reserveRoom,
    cancelReservation
} = require('../Controllers/RoomController')

const router = express.Router();


//get all rooms
router.get('/',getRooms)

//get available rooms
router.get('/available',availabeRooms)


//get specific room
router.get('/:id',specificRoom)

//reserve a room
router.post('/:id/reserve',reserveRoom)

//cancel reservation
router.post('/:id/cancel',cancelReservation)



module.exports = router;
