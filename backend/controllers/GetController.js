const {
  GetEventDatas,
  EventParticipantsVenueRequirementDetails,
  GuestAccommodationTransportDetails,
  EventCarFoodRefreshmentDetails,
  EventDetailstoAdmin,
} = require("../models/EventGet");

exports.GetEventDatas = async (req, res) => {
  try {
    const events = await GetEventDatas.select();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

exports.EventParticipantsVenueRequirementDetails = async (req, res) => {
  const eventId = req.params.id;
  try {
    const eventsData = await EventParticipantsVenueRequirementDetails.select(
      eventId
    );
    res.json(eventsData);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

exports.GuestAccommodationTransportDetails = async (req, res) => {
  const eventId = req.params.id;
  try {
    const guestsData = await GuestAccommodationTransportDetails.select(eventId);
    res.json(guestsData);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

exports.EventCarFoodRefreshmentDetails = async (req, res) => {
  const eventId = req.params.id;
  try {
    const extraData = await EventCarFoodRefreshmentDetails.select(eventId);
    res.json(extraData);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

exports.EventDetailstoAdmin = async (req, res) => {
  try {
    const adminDetails = await EventDetailstoAdmin.select();
    res.json(adminDetails);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};
