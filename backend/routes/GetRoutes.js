const express = require('express');
const router = express.Router();
const eventController = require('../controllers/GetController');

// Define route
router.get('/eventdata', eventController.getEventdata);
router.get('/eventparticipentsvenuerequirement/:id', eventController.EventParticipantsVenueRequirementDetails);
router.get('/guestaccommodationtransportDetails/:id', eventController.GuestAccommodationTransportDetails);
router.get('/admin', eventController.EventDetailstoAdmin);

module.exports = router;
