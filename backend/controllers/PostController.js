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
  console.log("Received event data in controller:", eventData);

  // Backend validation (basic example)
  if (
    !eventData.event_name ||
    !eventData.start_at ||
    !eventData.end_at ||
    !eventData.event_type ||
    !eventData.assigned_to
  ) {
    return res.status(400).json({ error: "Check Event Form and Fill it. Missing required fields!..." });
  }

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
  const participantsData = req.body;
  console.log("Received Participant data:", participantsData);

  // First, check the participants_status
  if (participantsData.participants_status === 1) {
    // Perform validations only if participants_status is 1
    if (
      !participantsData.event_id ||
      !participantsData.invitees_id ||
      participantsData.internal_count < 10 ||
      participantsData.ex_boys_count < 10 ||
      participantsData.ex_girls_count < 10
    ) {
      return res.status(400).json({
        error: "Check Participants Form. Missing required fields or invalid participant counts!",
      });
    }

    // Additional validation if accommodation is required
    if (participantsData.accommodation_status) {
      if (
        participantsData.acc_boys_count < 10 ||
        participantsData.acc_girls_count < 10
      ) {
        return res.status(400).json({
          error: "Accommodation count for boys and girls cannot be less than 10!",
        });
      }
    }
  }

  try {
    // If participants_status is 0 or all validations pass, proceed with the insertion
    const results = await ParticipantsForm.create(participantsData);
    res.status(201).json({
      message: "Participant created successfully",
      participant_id: results.insertId, // Send the ID to map the two tables from backend to frontend
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
  const venueData = req.body;
  console.log("Received Venue data:", venueData);

  // First, check the venue_register_status
  if (venueData.venue_register_status === 1) {
    // Perform validations only if venue_register_status is 1
    if (venueData.venue_count < 1) {
      return res.status(400).json({
        error: "Venue count must be at least 1",
      });
    }

    const venueTypes = ["Classrooms", "Seminar Hall", "Auditorium", "Labs"];
    if (!venueTypes.includes(venueData.venue_type)) {
      return res.status(400).json({
        error: "You must select a valid venue type",
      });
    }

    if (venueData.capacity < 60) {
      return res.status(400).json({
        error: "Venue capacity must be at least 60",
      });
    }
  }

  try {
    // If venue_register_status is 0 or all validations pass, proceed with the insertion
    const results = await VenueRegister.create(venueData);
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
  const venueRequirementData = req.body;
  console.log("Received VenueRequirement data:", venueRequirementData);

  // Check if venue_requirement_status is 1 to perform the validation
  if (venueRequirementData.venue_requirement_status === 1) {
    // Array of fields that need to be checked
    const fieldsToCheck = [
      "chair_count",
      "dais_table_count",
      "white_board_count",
      "hand_mic_count",
      "help_desk_count",
      "collar_mic_count",
      "internet_count",
      "live_stream_count",
      "biometric_count",
      "photography_count",
      "videography_count",
      "large_momento_count",
      "small_momento_count",
      "shawl_count",
      "pen_pencil_count",
      "scribbling_pad_count",
      "water_bottle_count",
    ];

    // Iterate through the fields and check if values are within the range 0-10
    for (let field of fieldsToCheck) {
      if (venueRequirementData[field] < 0 || venueRequirementData[field] > 10) {
        return res.status(400).json({
          error: `Venue Requirements must be between 1 and 10`,
        });
      }
    }
  }

  try {
    // If venue_requirement_status is 0 or all validations pass, proceed with the insertion
    const results = await VenueRequirement.create(venueRequirementData);
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
