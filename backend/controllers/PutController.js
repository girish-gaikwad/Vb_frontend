const {
  UpdateGuestCount,
  AdminEventAssign,
  AdminGuestAssign,
  AdminGuestAccommodationAssign,
  AdminGuestTransportAssign,
  AdminParticipantsAssign,
  AdminVenueAssign,
  AdminVenueRequirementAssign,
  AdminCarRequestAssign,
  AdminFoodRequestAssign,
  AdminRefreshmentRequestAssign,
} = require("../models/EventPut");

exports.UpdateGuestCount = async (req, res) => {
  const inviteesData = req.body;
  console.log("Received invitees data:", inviteesData);

  try {
    const results = await UpdateGuestCount.update(inviteesData);
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Guest count updated successfully",
        affectedRows: results.affectedRows,
      });
    } else {
      res.status(404).json({
        message: "No invitees found with the given event_id",
      });
    }
  } catch (err) {
    console.error("Error updating guest count:", err);
    res.status(500).json({
      error: "Error updating guest count",
      details: err.message,
    });
  }
};

exports.AdminEventAssign = async (req, res) => {
  const EventAssignData = req.body;
  console.log("Received Event Assign data:", EventAssignData);

  try {
    const results = await AdminEventAssign.update(EventAssignData);
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Event Assign Status updated successfully",
        affectedRows: results.affectedRows,
      });
    } else {
      res.status(404).json({
        message: "No Event Assign found with the given event_id",
      });
    }
  } catch (err) {
    console.error("Error updating Event Assign Status:", err);
    res.status(500).json({
      error: "Error updating Event Assign Status",
      details: err.message,
    });
  }
};

exports.AdminGuestAssign = async (req, res) => {
  const GuestAssignData = req.body;
  console.log("Received Guest Assign data:", GuestAssignData);

  try {
    const results = await AdminGuestAssign.update(GuestAssignData);
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Guest Assign Status updated successfully",
        affectedRows: results.affectedRows,
      });
    } else {
      res.status(404).json({
        message: "No Guest Assign found with the given event_id",
      });
    }
  } catch (err) {
    console.error("Error updating Guest Assign Status:", err);
    res.status(500).json({
      error: "Error updating Guest Assign Status",
      details: err.message,
    });
  }
};

exports.AdminGuestAccommodationAssign = async (req, res) => {
  const GuestAccommodationAssignData = req.body;
  console.log(
    "Received Guest Accommodation Assign data:",
    GuestAccommodationAssignData
  );

  try {
    const results = await AdminGuestAccommodationAssign.update(
      GuestAccommodationAssignData
    );
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Guest Accommodation Status updated successfully",
        affectedRows: results.affectedRows,
      });
    } else {
      res.status(404).json({
        message: "No Guest Accommodation found with the given event_id",
      });
    }
  } catch (err) {
    console.error("Error updating Guest Accommodation Status:", err);
    res.status(500).json({
      error: "Error updating Guest Accommodation Status",
      details: err.message,
    });
  }
};

exports.AdminGuestTransportAssign = async (req, res) => {
  const GuestTransportAssignData = req.body;
  console.log(
    "Received Guest Transport Assign data:",
    GuestTransportAssignData
  );

  try {
    const results = await AdminGuestTransportAssign.update(
      GuestTransportAssignData
    );
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Guest Transport Status updated successfully",
        affectedRows: results.affectedRows,
      });
    } else {
      res.status(404).json({
        message: "No Guest Transport found with the given event_id",
      });
    }
  } catch (err) {
    console.error("Error updating Guest Transport Status:", err);
    res.status(500).json({
      error: "Error updating Guest Transport Status",
      details: err.message,
    });
  }
};

exports.AdminParticipantsAssign = async (req, res) => {
  const ParticipantsAssignData = req.body;
  console.log("Received Participants Assign data:", ParticipantsAssignData);

  try {
    const results = await AdminParticipantsAssign.update(
      ParticipantsAssignData
    );
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Participants Assign Status updated successfully",
        affectedRows: results.affectedRows,
      });
    } else {
      res.status(404).json({
        message: "No Participants Assign found with the given event_id",
      });
    }
  } catch (err) {
    console.error("Error updating Participants Assign Status:", err);
    res.status(500).json({
      error: "Error updating Participants Assign Status",
      details: err.message,
    });
  }
};

exports.AdminVenueAssign = async (req, res) => {
  const VenueAssignData = req.body;
  console.log("Received Venue Assign data:", VenueAssignData);

  try {
    const results = await AdminVenueAssign.update(VenueAssignData);
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Venue Assign Status updated successfully",
        affectedRows: results.affectedRows,
      });
    } else {
      res.status(404).json({
        message: "No Venue Assign found with the given event_id",
      });
    }
  } catch (err) {
    console.error("Error updating Venue Assign Status:", err);
    res.status(500).json({
      error: "Error updating Venue Assign Status",
      details: err.message,
    });
  }
};

exports.AdminVenueRequirementAssign = async (req, res) => {
  const VenueRequirementAssignData = req.body;
  console.log(
    "Received Venue Requirement Assign data:",
    VenueRequirementAssignData
  );

  try {
    const results = await AdminVenueRequirementAssign.update(
      VenueRequirementAssignData
    );
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Venue Requirement Assign Status updated successfully",
        affectedRows: results.affectedRows,
      });
    } else {
      res.status(404).json({
        message: "No Venue Requirement Assign found with the given event_id",
      });
    }
  } catch (err) {
    console.error("Error updating Venue Requirement Assign Status:", err);
    res.status(500).json({
      error: "Error updating Venue Requirement Assign Status",
      details: err.message,
    });
  }
};

exports.AdminCarRequestAssign = async (req, res) => {
  const CarRequestAssignData = req.body;
  console.log("Received Car Request Assign data:", CarRequestAssignData);

  try {
    const results = await AdminCarRequestAssign.update(CarRequestAssignData);
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Car Request Assign Status updated successfully",
        affectedRows: results.affectedRows,
      });
    } else {
      res.status(404).json({
        message: "No Car Request Assign found with the given event_id",
      });
    }
  } catch (err) {
    console.error("Error updating Car Request Assign Status:", err);
    res.status(500).json({
      error: "Error updating Car Request Assign Status",
      details: err.message,
    });
  }
};

exports.AdminFoodRequestAssign = async (req, res) => {
  const FoodRequestAssignData = req.body;
  console.log("Received Food Request Assign data:", FoodRequestAssignData);

  try {
    const results = await AdminFoodRequestAssign.update(FoodRequestAssignData);
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Food Request Assign Status updated successfully",
        affectedRows: results.affectedRows,
      });
    } else {
      res.status(404).json({
        message: "No Food Request Assign found with the given event_id",
      });
    }
  } catch (err) {
    console.error("Error updating Food Request Assign Status:", err);
    res.status(500).json({
      error: "Error updating Food Request Assign Status",
      details: err.message,
    });
  }
};

exports.AdminRefreshmentRequestAssign = async (req, res) => {
  const RefreshmentRequestAssignData = req.body;
  console.log(
    "Received Refreshment Request Assign data:",
    RefreshmentRequestAssignData
  );

  try {
    const results = await AdminRefreshmentRequestAssign.update(
      RefreshmentRequestAssignData
    );
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Refreshment Request Assign Status updated successfully",
        affectedRows: results.affectedRows,
      });
    } else {
      res.status(404).json({
        message: "No Refreshment Request Assign found with the given event_id",
      });
    }
  } catch (err) {
    console.error("Error updating Refreshment Request Assign Status:", err);
    res.status(500).json({
      error: "Error updating Refreshment Request Assign Status",
      details: err.message,
    });
  }
};
