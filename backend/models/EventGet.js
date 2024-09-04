const db = require("../config/db");
const util = require("util");

const Event = {}; // Object to hold all Event-related functions

// Promisify the query function for async/await compatibility
const query = util.promisify(db.query).bind(db);

// Function to get general event data
Event.getEventdata = () => {
  const sql = "SELECT id,event_name, start_at, end_at, status FROM event";

  return query(sql)
    .then((results) => {
      return results;
    })
    .catch((err) => {
      throw new Error(`Database query failed: ${err.message}`);
    });
};

// Function to get specific event details by ID
Event.EventParticipantsVenueRequirementDetails = (id) => {
  const sql =
    "SELECT e.id AS event_id, e.event_name, e.start_at, e.end_at, e.event_type, e.assigned_to, e.status AS event_status, ep.internal_count, ep.ex_boys_count, ep.ex_girls_count, ep.male_faculty_count, ep.female_faculty_count, ep.accommodation_status, ep.acc_boys_count, ep.acc_girls_count, ep.acc_male_faculty_count, ep.acc_female_faculty_count, ep.status AS participants_status, inv.guest_count, vb.venue_type, vb.venue_count, vb.capacity, vb.status AS venue_status, vr.chair_count, vr.dais_table_count, vr.white_board_count, vr.hand_mic_count, vr.help_desk_count, vr.collar_mic_count, vr.internet_count, vr.live_stream_count, vr.biometric_count, vr.photography_count, vr.videography_count, vr.large_momento_count, vr.small_momento_count, vr.shawl_count, vr.pen_pencil_count, vr.scribbling_pad_count, vr.water_bottle_count, vr.others, vr.status AS requirement_status FROM event e LEFT JOIN event_participants ep ON e.id = ep.event_id LEFT JOIN invitees inv ON e.id = inv.event_id LEFT JOIN venue_booking vb ON e.id = vb.event_id LEFT JOIN venue_requirement vr ON e.id = vr.event_id AND vb.id = vr.venue_id WHERE e.id = ?";

  return query(sql, [id])
    .then((results) => {
      return results;
    })
    .catch((err) => {
      throw new Error(`Database query failed: ${err.message}`);
    });
};

Event.GuestAccommodationTransportDetails = (id) => {
  const sql =
    "SELECT e.id AS event_id, e.event_name, e.start_at, e.end_at, e.event_type, e.assigned_to, e.status AS event_status, eg.id AS guest_id, eg.salutation, eg.first_name, eg.last_name, eg.gender, eg.designation, eg.organization, eg.email, eg.country_code, eg.phone_number, eg.status AS guest_status, i.id AS invitees_id, i.guest_count, ac.id AS accommodation_id, ac.is_alone AS accommodation_is_alone, ac.pair_with AS accommodation_pair_with, ac.arrival_at AS accommodation_arrival_at, ac.departure_at AS accommodation_departure_at, ac.accommodation_venue, ac.status AS accommodation_status, gt.id AS transport_id, gt.is_alone AS transport_is_alone, gt.pair_with1 AS transport_pair_with1, gt.pair_with2 AS transport_pair_with2, gt.travel_type, gt.vehicle_type, gt.t_arrival_at AS transport_arrival_at, gt.t_departure_at AS transport_departure_at, gt.from_place, gt.to_place, gt.r_from_place, gt.r_to_place, gt.status AS transport_status FROM event e LEFT JOIN invitees i ON e.id = i.event_id LEFT JOIN event_guests eg ON i.id = eg.invitees_id LEFT JOIN accommodation_combine ac ON eg.id = ac.guest_id AND e.id = ac.event_id LEFT JOIN guest_transport gt ON eg.id = gt.guest_id AND e.id = gt.event_id WHERE e.id = ?";

  return query(sql, [id])
    .then((results) => {
      return results; // Return the entire array of objects
    })
    .catch((err) => {
      throw new Error(`Database query failed: ${err.message}`);
    });
};

Event.EventDetailstoAdmin = () => {
  const sql = "SELECT e.id AS event_id, e.start_at, e.end_at, e.status AS event_status, u.faculty_name, u.mobile_number FROM event e LEFT JOIN user u ON e.user_id = u.id WHERE e.status = 1";

  return query(sql)
    .then((results) => {
      return results;
    })
    .catch((err) => {
      throw new Error(`Database query failed: ${err.message}`);
    });
};

module.exports = Event;
