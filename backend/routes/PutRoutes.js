const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PutController');

router.put('/update-guest-count', PostController.UpdateGuestCount);
router.put('/admin-event-assign', PostController.AdminEventAssign);
router.put('/admin-guest-assign', PostController.AdminGuestAssign);
router.put('/admin-guest-accommodation-assign', PostController.AdminGuestAccommodationAssign);
router.put('/admin-guest-transport-assign', PostController.AdminGuestTransportAssign);
router.put('/admin-participants-assign', PostController.AdminParticipantsAssign);
router.put('/admin-venue-assign', PostController.AdminVenueAssign);
router.put('/admin-venue-requirement-assign', PostController.AdminVenueRequirementAssign);
router.put('/admin-car-request-assign', PostController.AdminCarRequestAssign);
router.put('/admin-food-request-assign', PostController.AdminFoodRequestAssign);
router.put('/admin-refreshment-request-assign', PostController.AdminRefreshmentRequestAssign);

module.exports = router;
