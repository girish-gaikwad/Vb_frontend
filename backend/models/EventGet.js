const db = require("../config/db");
const util = require("util");

// Promisify the query function for async/await compatibility
const query = util.promisify(db.query).bind(db);

class GetEventDatas {
  static select() {
    const sql = "SELECT id, event_name, start_at, end_at, status FROM event";
    return new Promise(async (resolve, reject) => {
      try {
        const results = await query(sql);
        resolve(results); // Resolving the promise with the query results
      } catch (err) {
        reject(new Error(`Database query failed: ${err.message}`)); // Rejecting in case of error
      }
    });
  }
}

class EventParticipantsVenueRequirementDetails {
  static select(id) {
    const sql =
      "SELECT e.id AS event_id, e.event_name, e.start_at, e.end_at, e.event_type, e.assigned_to, COALESCE(e.status, 0) AS event_status, ep.internal_count, ep.ex_boys_count, ep.ex_girls_count, ep.male_faculty_count, ep.female_faculty_count, ep.accommodation_status, ep.acc_boys_count, ep.acc_girls_count, ep.acc_male_faculty_count, ep.acc_female_faculty_count, COALESCE(ep.status, 0) AS participants_status, inv.guest_count, vb.venue_type, vb.venue_count, vb.capacity, COALESCE(vb.status, 0) AS venue_status, vr.chair_count, vr.dais_table_count, vr.white_board_count, vr.hand_mic_count, vr.help_desk_count, vr.collar_mic_count, vr.internet_count, vr.live_stream_count, vr.biometric_count, vr.photography_count, vr.videography_count, vr.large_momento_count, vr.small_momento_count, vr.shawl_count, vr.pen_pencil_count, vr.scribbling_pad_count, vr.water_bottle_count, vr.others, COALESCE(vr.status, 0) AS requirement_status FROM event e LEFT JOIN event_participants ep ON e.id = ep.event_id LEFT JOIN invitees inv ON e.id = inv.event_id LEFT JOIN venue_booking vb ON e.id = vb.event_id LEFT JOIN venue_requirement vr ON e.id = vr.event_id AND vb.id = vr.venue_id WHERE e.id = ?";

    return new Promise(async (resolve, reject) => {
      try {
        const results = await query(sql, [id]);
        resolve(results); // Resolving the promise with the results
      } catch (err) {
        reject(new Error(`Database query failed: ${err.message}`)); // Rejecting in case of error
      }
    });
  }
}

class GuestAccommodationTransportDetails {
  static select(id) {
    const sql =
      "SELECT e.id AS event_id, e.event_name, e.start_at, e.end_at, e.event_type, e.assigned_to, COALESCE(e.status, 0) AS event_status, eg.id AS guest_id, eg.salutation, eg.first_name, eg.last_name, eg.gender, eg.designation, eg.organization, eg.email, eg.country_code, eg.phone_number, COALESCE(eg.status, 0) AS guest_status, i.id AS invitees_id, i.guest_count, ac.id AS accommodation_id, ac.is_alone AS accommodation_is_alone, ac.pair_with AS accommodation_pair_with, ac.arrival_at AS accommodation_arrival_at, ac.departure_at AS accommodation_departure_at, ac.accommodation_venue, COALESCE(ac.status, 0) AS accommodation_status, gt.id AS transport_id, gt.is_alone AS transport_is_alone, gt.pair_with1 AS transport_pair_with1, gt.pair_with2 AS transport_pair_with2, gt.travel_type, gt.vehicle_type, gt.t_arrival_at AS transport_arrival_at, gt.t_departure_at AS transport_departure_at, gt.from_place, gt.to_place, gt.r_from_place, gt.r_to_place, COALESCE(gt.status, 0) AS transport_status FROM event e LEFT JOIN invitees i ON e.id = i.event_id LEFT JOIN event_guests eg ON i.id = eg.invitees_id LEFT JOIN accommodation_combine ac ON eg.id = ac.guest_id AND e.id = ac.event_id LEFT JOIN guest_transport gt ON eg.id = gt.guest_id AND e.id = gt.event_id WHERE e.id = ?";

    return new Promise(async (resolve, reject) => {
      try {
        const results = await query(sql, [id]);
        resolve(results); // Resolving the promise with the results
      } catch (err) {
        reject(new Error(`Database query failed: ${err.message}`)); // Rejecting in case of error
      }
    });
  }
}

class EventCarFoodRefreshmentDetails {
  static select(id) {
    const sql =
      "SELECT e.id AS event_id, e.event_name, e.start_at, e.end_at, e.event_type, e.assigned_to, e.status AS event_status, cr.id AS car_request_id, cr.car_count, cr.arrival_at AS car_arrival_at, cr.depature_at AS car_departure_at, cr.car_type, COALESCE(cr.status, 0) AS car_request_status, fr.id AS food_request_id, fr.preferred_food, fr.time AS food_time, fr.food_quantity, fr.to_venue AS food_to_venue, COALESCE(fr.status, 0) AS food_request_status, rr.id AS refreshment_request_id, rr.refreshment_dish, rr.time AS refreshment_time, rr.to_venue AS refreshment_to_venue, rr.quantity AS refreshment_quantity, COALESCE(rr.status, 0) AS refreshment_request_status FROM event e LEFT JOIN car_request cr ON e.id = cr.event_id LEFT JOIN food_request fr ON e.id = fr.event_id LEFT JOIN refreshment_request rr ON e.id = rr.event_id WHERE e.id = ?";

    return new Promise(async (resolve, reject) => {
      try {
        const results = await query(sql, [id]);
        resolve(results); // Resolving the promise with the results
      } catch (err) {
        reject(new Error(`Database query failed: ${err.message}`)); // Rejecting in case of error
      }
    });
  }
}

class EventDetailstoAdmin {
  static select() {
    const sql =
      "SELECT DISTINCT e.id AS event_id, e.start_at, e.end_at, u.faculty_name, u.mobile_number, e.status AS event_status, COALESCE(eg.status, 0) AS event_guest_status, COALESCE(ac.status, 0) AS accommodation_status, COALESCE(gt.status, 0) AS transport_status, COALESCE(ep.status, 0) AS event_participants_status, COALESCE(vb.status, 0) AS venue_booking_status, COALESCE(vr.status, 0) AS venue_requirement_status, COALESCE(cr.status, 0) AS car_request_status, COALESCE(fr.status, 0) AS food_request_status, COALESCE(rr.status, 0) AS refreshment_request_status FROM event e LEFT JOIN user u ON e.user_id = u.id LEFT JOIN event_guests eg ON eg.event_id = e.id LEFT JOIN accommodation_combine ac ON ac.event_id = e.id LEFT JOIN guest_transport gt ON gt.event_id = e.id LEFT JOIN event_participants ep ON ep.event_id = e.id LEFT JOIN venue_booking vb ON vb.event_id = e.id LEFT JOIN venue_requirement vr ON vr.event_id = e.id LEFT JOIN car_request cr ON cr.event_id = e.id LEFT JOIN food_request fr ON fr.event_id = e.id LEFT JOIN refreshment_request rr ON rr.event_id = e.id WHERE e.status = 1 OR COALESCE(eg.status, 0) = 1 OR COALESCE(ac.status, 0) = 1 OR COALESCE(gt.status, 0) = 1 OR COALESCE(ep.status, 0) = 1 OR COALESCE(vb.status, 0) = 1 OR COALESCE(vr.status, 0) = 1 OR COALESCE(cr.status, 0) = 1 OR COALESCE(fr.status, 0) = 1 OR COALESCE(rr.status, 0) = 1";

    return new Promise(async (resolve, reject) => {
      try {
        const results = await query(sql);
        resolve(results); // Resolving the promise with the results
      } catch (err) {
        reject(new Error(`Database query failed: ${err.message}`)); // Rejecting in case of error
      }
    });
  }
}

module.exports = {
  GetEventDatas,
  EventParticipantsVenueRequirementDetails,
  GuestAccommodationTransportDetails,
  EventCarFoodRefreshmentDetails,
  EventDetailstoAdmin,
};
