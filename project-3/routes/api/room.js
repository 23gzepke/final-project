const router = require('express').Router();
const roomsController = require('../../controllers/roomController');

// Matches with '/api/rooms
router.route('/')
    .get(roomsController.findAll)
    .post(roomsController.create);


router
    .route('/:id')
    .get(roomsController.findById)

module.exports = router;