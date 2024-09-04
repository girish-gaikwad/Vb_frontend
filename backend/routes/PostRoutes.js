const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

// Define route
router.post('/eventform', PostController.EventForm);
router.post('/eventguest', PostController.GuestForm);
router.post('/participants', PostController.ParticipantsForm);
router.post('/combineaccommodation', PostController.CombineAccommodation);
router.post('/combinetransport', PostController.CombineTransport);
router.post('/venueregister', PostController.VenueRegister);
router.post('/venuerequirement', PostController.VenueRequirement);
router.post('/invitees', PostController.invitees);
router.post('/car-request', PostController.CarRequest);
router.post('/foodrequest', PostController.FoodRequest);
router.post('/refreshmentrequest', PostController.RefreshmentRequest);

module.exports = router;
