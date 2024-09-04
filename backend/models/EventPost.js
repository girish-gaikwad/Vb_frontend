const db = require("../config/db");
class EventForm {
  static create(eventData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO event(user_id,event_name,start_at,end_at,event_type,assigned_to,status) VALUES (?,?,?,?,?,?,?)";
      const values = [
        eventData.user_id,
        eventData.event_name,
        eventData.start_at,
        eventData.end_at,
        eventData.event_type,
        eventData.assigned_to,
        eventData.event_status,
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
class GuestForm {
  static create(GuestDataArray) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO event_guests(event_id,invitees_id,salutation,first_name,last_name,gender,designation,organization,email,country_code,phone_number,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

      const promises = GuestDataArray.map((GuestData) => {
        const values = [
          GuestData.event_id,
          GuestData.invitees_id,
          GuestData.salutation,
          GuestData.first_name,
          GuestData.last_name,
          GuestData.gender,
          GuestData.designation,
          GuestData.organization,
          GuestData.email,
          GuestData.country_code,
          GuestData.phone_number,
          GuestData.guest_status,
        ];

        return new Promise((resolve, reject) => {
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
      });

      Promise.all(promises)
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

class ParticipantsForm {
  static create(ParticipantsData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO event_participants(event_id,invitees_id,internal_count,ex_boys_count,ex_girls_count,male_faculty_count,female_faculty_count,accommodation_status,acc_boys_count,acc_girls_count,acc_male_faculty_count,acc_female_faculty_count,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
      const values = [
        ParticipantsData.event_id,
        ParticipantsData.invitees_id,
        ParticipantsData.internal_count,
        ParticipantsData.ex_boys_count,
        ParticipantsData.ex_girls_count,
        ParticipantsData.male_faculty_count,
        ParticipantsData.female_faculty_count,
        ParticipantsData.accommodation_status,
        ParticipantsData.acc_boys_count,
        ParticipantsData.acc_girls_count,
        ParticipantsData.acc_male_faculty_count,
        ParticipantsData.acc_female_faculty_count,
        ParticipantsData.participants_status,
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
class CombineAccommodation {
  static create(CombineAccommodationDataArray) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO accommodation_combine(event_id,guest_id,is_alone,pair_with,arrival_at,departure_at,accommodation_venue,status) VALUES (?,?,?,?,?,?,?,?)";

      const promises = CombineAccommodationDataArray.map(
        (CombineAccommodationData) => {
          const values = [
            CombineAccommodationData.event_id,
            CombineAccommodationData.guest_id,
            CombineAccommodationData.is_alone,
            CombineAccommodationData.pair_with,
            CombineAccommodationData.arrival_at,
            CombineAccommodationData.departure_at,
            CombineAccommodationData.accommodation_venue,
            CombineAccommodationData.combine_accommodation_status,
          ];

          return new Promise((resolve, reject) => {
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
      );

      Promise.all(promises)
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
class CombineTransport {
  static create(CombineTransportDataArray) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO guest_transport(event_id,guest_id,is_alone,pair_with1,pair_with2,travel_type,vehicle_type,t_arrival_at,t_departure_at,from_place,to_place,r_from_place,r_to_place,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

      const promises = CombineTransportDataArray.map((CombineTransportData) => {
        const values = [
          CombineTransportData.event_id,
          CombineTransportData.guest_id,
          CombineTransportData.is_alone,
          CombineTransportData.pair_with1,
          CombineTransportData.pair_with2,
          CombineTransportData.travel_type,
          CombineTransportData.vehicle_type,
          CombineTransportData.t_arrival_at,
          CombineTransportData.t_departure_at,
          CombineTransportData.from_place,
          CombineTransportData.to_place,
          CombineTransportData.r_from_place,
          CombineTransportData.r_to_place,
          CombineTransportData.combine_transport_status,
        ];
        return new Promise((resolve, reject) => {
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
      });

      Promise.all(promises)
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
class VenueRegister {
  static create(VenueRegisterData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO venue_booking(event_id,venue_type,venue_name,venue_count,capacity,status) VALUES (?,?,?,?,?,?)";
      const values = [
        VenueRegisterData.event_id,
        VenueRegisterData.venue_type,
        VenueRegisterData.venue_name,
        VenueRegisterData.venue_count,
        VenueRegisterData.capacity,
        VenueRegisterData.venue_register_status,
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
class VenueRequirement {
  static create(VenueRequirementData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO venue_requirement(event_id,venue_id,chair_count,dais_table_count,white_board_count,hand_mic_count,help_desk_count,collar_mic_count,internet_count,live_stream_count,biometric_count,photography_count,videography_count,large_momento_count,small_momento_count,shawl_count,pen_pencil_count,scribbling_pad_count,water_bottle_count,others,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      const values = [
        VenueRequirementData.event_id,
        VenueRequirementData.venue_id,
        VenueRequirementData.chair_count,
        VenueRequirementData.dais_table_count,
        VenueRequirementData.white_board_count,
        VenueRequirementData.hand_mic_count,
        VenueRequirementData.help_desk_count,
        VenueRequirementData.collar_mic_count,
        VenueRequirementData.internet_count,
        VenueRequirementData.live_stream_count,
        VenueRequirementData.biometric_count,
        VenueRequirementData.photography_count,
        VenueRequirementData.videography_count,
        VenueRequirementData.large_momento_count,
        VenueRequirementData.small_momento_count,
        VenueRequirementData.shawl_count,
        VenueRequirementData.pen_pencil_count,
        VenueRequirementData.scribbling_pad_count,
        VenueRequirementData.water_bottle_count,
        VenueRequirementData.others,
        VenueRequirementData.venue_requirement_status,
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
class invitees {
  static create(inviteesData) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO invitees(event_id,guest_count) VALUES (?,?)";
      const values = [inviteesData.event_id, inviteesData.guest_count];
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
class CarRequest {
  static create(CarRequestData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO car_request(event_id,car_count,arrival_at,depature_at,car_type,status) VALUES (?,?,?,?,?,?)";
      const values = [
        CarRequestData.event_id,
        CarRequestData.car_count,
        CarRequestData.arrival_at,
        CarRequestData.depature_at,
        CarRequestData.car_type,
        CarRequestData.car_request_status,
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
class FoodRequest {
  static create(FoodRequestData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO food_request(event_id,preferred_food,time,food_quantity,to_venue,status) VALUES (?,?,?,?,?,?)";
      const values = [
        FoodRequestData.event_id,
        FoodRequestData.preferred_food,
        FoodRequestData.time,
        FoodRequestData.food_quantity,
        FoodRequestData.to_venue,
        FoodRequestData.food_request_status,
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
class RefreshmentRequest {
  static create(RefreshmentRequestData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO refreshment_request(event_id,refreshment_dish,time,to_venue,quantity,status) VALUES (?,?,?,?,?,?)";
      const values = [
        RefreshmentRequestData.event_id,
        RefreshmentRequestData.refreshment_dish,
        RefreshmentRequestData.time,
        RefreshmentRequestData.to_venue,
        RefreshmentRequestData.quantity,
        RefreshmentRequestData.refreshment_request_status,
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
};
