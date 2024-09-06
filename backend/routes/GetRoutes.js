const express = require('express');
const router = express.Router();
const eventController = require('../controllers/GetController');

// Define route
router.get('/eventdata', eventController.GetEventDatas);
router.get('/eventparticipentsvenuerequirement/:id', eventController.EventParticipantsVenueRequirementDetails);
router.get('/guestaccommodationtransportDetails/:id', eventController.GuestAccommodationTransportDetails);
router.get('/extracarfoodrefreshment/:id', eventController.EventCarFoodRefreshmentDetails);
router.get('/admin', eventController.EventDetailstoAdmin);

module.exports = router;
