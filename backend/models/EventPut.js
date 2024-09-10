const db = require("../config/db"); // Assuming you have a database.js file for the DB connection

class UpdateGuestCount {
  static update(inviteesData) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE invitees SET guest_count = ? WHERE event_id = ?";
      const values = [inviteesData.guest_count, inviteesData.event_id];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
class AdminEventAssign {
  static update(EventAssignData) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE event SET status = ? WHERE id = ?";
      const values = [EventAssignData.status, EventAssignData.event_id];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
class AdminGuestAssign {
  static update(GuestAssignData) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE event_guests SET status = ? WHERE event_id = ?";
      const values = [GuestAssignData.status, GuestAssignData.event_id];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
class AdminGuestAccommodationAssign {
  static update(GuestAccommodationAssignData) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE accommodation_combine SET status = ? WHERE event_id = ?";
      const values = [
        GuestAccommodationAssignData.status,
        GuestAccommodationAssignData.event_id,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
class AdminGuestTransportAssign {
  static update(GuestTransportAssignData) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE guest_transport SET status = ? WHERE event_id = ?";
      const values = [
        GuestTransportAssignData.status,
        GuestTransportAssignData.event_id,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
class AdminParticipantsAssign {
  static update(ParticipantsAssignData) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE event_participants SET status = ? WHERE event_id = ?";
      const values = [
        ParticipantsAssignData.status,
        ParticipantsAssignData.event_id,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
class AdminVenueAssign {
  static update(VenueAssignData) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE venue_booking SET status = ? WHERE event_id = ?";
      const values = [VenueAssignData.status, VenueAssignData.event_id];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
class AdminVenueRequirementAssign {
  static update(VenueRequirementAssignData) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE venue_requirement SET status = ? WHERE event_id = ?";
      const values = [
        VenueRequirementAssignData.status,
        VenueRequirementAssignData.event_id,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
class AdminCarRequestAssign {
  static update(CarRequestAssignData) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE car_request SET status = ? WHERE event_id = ?";
      const values = [
        CarRequestAssignData.status,
        CarRequestAssignData.event_id,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
class AdminFoodRequestAssign {
  static update(FoodRequestAssignData) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE food_request SET status = ? WHERE event_id = ?";
      const values = [
        FoodRequestAssignData.status,
        FoodRequestAssignData.event_id,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
class AdminRefreshmentRequestAssign {
  static update(RefreshmentRequestAssignData) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE refreshment_request SET status = ? WHERE event_id = ?";
      const values = [
        RefreshmentRequestAssignData.status,
        RefreshmentRequestAssignData.event_id,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
class EventEdit {
  static update(EventEditData) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE event SET event_name = ?, start_at = ?, end_at = ?, event_type = ?, assigned_to = ?, status = ? WHERE id = ?";
      const values = [
        EventEditData.event_name,
        EventEditData.start_at,
        EventEditData.end_at,
        EventEditData.event_type,
        EventEditData.assigned_to,
        EventEditData.status,
        EventEditData.event_id,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}

module.exports = {
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
  EventEdit,
};
