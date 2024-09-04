const Event = require("../models/EventGet");

exports.getEventdata = (req, res) => {
  Event.getEventdata()
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message || "Internal Server Error" });
    });
};

exports.EventParticipantsVenueRequirementDetails = (req, res) => {
  const eventId = req.params.id;

  Event.EventParticipantsVenueRequirementDetails(eventId)
    .then((eventsData) => {
      res.json(eventsData);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message || "Internal Server Error" });
    });
};

exports.GuestAccommodationTransportDetails = (req, res) => {
  const eventId = req.params.id;

  Event.GuestAccommodationTransportDetails(eventId)
    .then((guestsData) => {
      res.json(guestsData); // Send the array of objects as JSON
    })
    .catch((err) => {
      res.status(500).json({ error: err.message || "Internal Server Error" });
    });
};

exports.EventDetailstoAdmin = (req, res) => {
  Event.EventDetailstoAdmin()
    .then((EventDetailstoAdmin) => {
      res.json(EventDetailstoAdmin);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message || "Internal Server Error" });
    });
};
