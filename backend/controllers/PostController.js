const {
  EventForm,
  GuestForm,
  ParticipantsForm,
  CombineAccommodation,
  CombineTransport,
  VenueRegister,
  VenueRequirement,
  invitees,
  CarRequest,
  FoodRequest,
  RefreshmentRequest,
} = require("../models/EventPost");

exports.EventForm = async (req, res) => {
  const eventData = req.body;
  console.log("Received event data controllers:", eventData);

  try {
    const results = await EventForm.create(eventData);
    res.status(201).json({
      message: "Event created successfully",
      event_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({
      error: "Error creating event",
      details: err.message,
    });
  }
};

exports.GuestForm = async (req, res) => {
  const GuestData = req.body;
  console.log("Received Guest data:", GuestData);

  try {
    const results = await GuestForm.create(GuestData);
    res.status(201).json({
      message: "Guest created successfully",
      guest_id: results.map((result) => result.insertId), // Returns an array of inserted IDs
    });
  } catch (err) {
    console.error("Error creating Guest:", err);
    res.status(500).json({
      error: "Error creating Guest",
      details: err.message,
    });
  }
};


exports.ParticipantsForm = async (req, res) => {
  const ParticipantsData = req.body;
  console.log("Received Participant data:", ParticipantsData);

  try {
    const results = await ParticipantsForm.create(ParticipantsData);
    res.status(201).json({
      message: "Participant created successfully",
      Participant_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating Participant:", err);
    res.status(500).json({
      error: "Error creating Participant",
      details: err.message,
    });
  }
};

exports.CombineAccommodation = async (req, res) => {
  const CombineAccommodationData = req.body;
  console.log("Received CombineAccommodation data:", CombineAccommodationData);

  try {
    const results = await CombineAccommodation.create(CombineAccommodationData);
    res.status(201).json({
      message: "CombineAccommodation created successfully",
      CombineAccommodation_id: results.map((result) => result.insertId),
    });
  } catch (err) {
    console.error("Error creating CombineAccommodation:", err);
    res.status(500).json({
      error: "Error creating CombineAccommodation",
      details: err.message,
    });
  }
};

exports.CombineTransport = async (req, res) => {
  const TransportData = req.body;
  console.log("Received GuestTransport data:", TransportData);

  try {
    const results = await CombineTransport.create(TransportData);
    res.status(201).json({
      message: "GuestTransport created successfully",
      Transport_id: results.map((result) => result.insertId), // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating GuestTransport:", err);
    res.status(500).json({
      error: "Error creating GuestTransport",
      details: err.message,
    });
  }
};

exports.VenueRegister = async (req, res) => {
  const VenueRegisterData = req.body;
  console.log("Received Venue data:", VenueRegisterData);

  try {
    const results = await VenueRegister.create(VenueRegisterData);
    res.status(201).json({
      message: "Venue created successfully",
      VenueBooking_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating Venue:", err);
    res.status(500).json({
      error: "Error creating Venue",
      details: err.message,
    });
  }
};

exports.VenueRequirement = async (req, res) => {
  const VenueRequirementData = req.body;
  console.log("Received VenueRequirement data:", VenueRequirementData);

  try {
    const results = await VenueRequirement.create(VenueRequirementData);
    res.status(201).json({
      message: "VenueRequirement created successfully",
      VenueRequirement_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating VenueRequirement:", err);
    res.status(500).json({
      error: "Error creating VenueRequirement",
      details: err.message,
    });
  }
};

exports.invitees = async (req, res) => {
  const inviteesData = req.body;
  console.log("Received invitees data:", inviteesData);

  try {
    const results = await invitees.create(inviteesData);
    res.status(201).json({
      message: "invitees created successfully",
      invitees_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating invitees:", err);
    res.status(500).json({
      error: "Error creating invitees",
      details: err.message,
    });
  }
};

exports.CarRequest = async (req, res) => {
  const CarRequestData = req.body;
  console.log("Received CarRequest data:", CarRequestData);

  try {
    const results = await CarRequest.create(CarRequestData);
    res.status(201).json({
      message: "CarRequest created successfully",
      car_request_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating CarRequest:", err);
    res.status(500).json({
      error: "Error creating CarRequest",
      details: err.message,
    });
  }
};

exports.FoodRequest = async (req, res) => {
  const FoodRequestData = req.body;
  console.log("Received FoodRequest data:", FoodRequestData);

  try {
    const results = await FoodRequest.create(FoodRequestData);
    res.status(201).json({
      message: "FoodRequest created successfully",
      food_request_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating FoodRequest:", err);
    res.status(500).json({
      error: "Error creating FoodRequest",
      details: err.message,
    });
  }
};

exports.RefreshmentRequest = async (req, res) => {
  const RefreshmentRequestData = req.body;
  console.log("Received FoodRequest data:", RefreshmentRequestData);

  try {
    const results = await RefreshmentRequest.create(RefreshmentRequestData);
    res.status(201).json({
      message: "RefreshmentRequest created successfully",
      refreshment_request_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating RefreshmentRequest:", err);
    res.status(500).json({
      error: "Error creating RefreshmentRequest",
      details: err.message,
    });
  }
};
