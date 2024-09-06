import React, { useState, useEffect } from "react";
import axios from "axios";
import "./eventmanagerwork.css";
import { CiSquareMore } from "react-icons/ci";
import Divider from "@mui/material/Divider";
import { IoSendSharp } from "react-icons/io5";
import suit from "/img/suit.png";
import money from "/img/money.png";
import Pending from "/img/pending-img.png";
import InProgress from "/img/InProgress-img.png";
import Assigned from "/img/Assigned-img.png";
import Completed from "/img/Completed-img.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Precomputed image selection function
const getRandomImage = () => {
  const images = [suit, money];
  return images[Math.floor(Math.random() * images.length)];
};

// Add random images to dummyData
const addRandomImagesToEvents = (data) => {
  return data.map((event) => ({
    ...event,
    image: getRandomImage(),
  }));
};

const formatDateTime = (dateTime) => {
  const dateObj = new Date(dateTime);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  // Format date as DD-MM-YYYY
  const date = dateObj.toLocaleDateString("en-GB", options).replace(/\//g, "-");

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const time = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return `${date} - ${time}`;
};

function EVENTMANAGERWORK({
  approvedEvents,
  setApprovedEvents,
  dummyData,
  setSelectedEvent,
}) {
  const [events, setEvents] = useState(() =>
    addRandomImagesToEvents(dummyData)
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get/admin`)
      .then((response) => {
        const eventsWithImages = addRandomImagesToEvents(response.data);
        setEvents(eventsWithImages);
        console.log(eventsWithImages);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("503 Failed to Get Data");
      });
  }, []);

  const handleViewClick = (event) => {
    setSelectedEvent(event);
    navigate(`/registered-event/${event.event_id}`); // Navigate to event details page
  };

  const groupEventsByDate = (events) => {
    const groupedEvents = {};
    const today = new Date().setHours(0, 0, 0, 0);
    const tomorrow = new Date(today + 24 * 60 * 60 * 1000);
    const dayAfterTomorrow = new Date(today + 2 * 24 * 60 * 60 * 1000);

    events.forEach((event) => {
      const eventDate = new Date(event.start_at).setHours(0, 0, 0, 0);

      if (eventDate === tomorrow.getTime()) {
        if (!groupedEvents["Tomorrow"]) groupedEvents["Tomorrow"] = [];
        groupedEvents["Tomorrow"].push(event);
      } else if (eventDate === dayAfterTomorrow.getTime()) {
        if (!groupedEvents["After 1 Day"]) groupedEvents["After 1 Day"] = [];
        groupedEvents["After 1 Day"].push(event);
      } else {
        const eventDateLabel = new Date(eventDate)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-");
        if (!groupedEvents[eventDateLabel]) groupedEvents[eventDateLabel] = [];
        groupedEvents[eventDateLabel].push(event);
      }
    });

    return groupedEvents;
  };

  const groupedEvents = groupEventsByDate(events);

  return (
    <>
      <div className="infrawork-static-details" style={{ width: "100%" }}>
        <ToastContainer />
        <div
          className="infrawork-header"
          style={{ display: "flex", width: "100%" }}
        >
          <h2>Pending List</h2>
          <div>
            <CiSquareMore style={{ height: "30px", width: "30px" }} />
          </div>
        </div>

        <div className="infrawork-labels">
          <p>Faculty</p>
          <p>Start</p>
          <p>End</p>
          <p>Status</p>
          <p>Action</p>
        </div>
        <Divider variant="middle" component="p" />
      </div>
      <div className="infrawork-scroll-events" style={{ paddingTop: "0" }}>
        {Object.keys(groupedEvents).map((dateLabel) => (
          <div
            key={dateLabel}
            className="infrawork-event-group"
            style={{ border: "", padding: "10px 0 5px 15px" }}
          >
            <div className="infrawork-label-x">{dateLabel}</div>
            <div className="infrawork-tomorrow-content">
              {groupedEvents[dateLabel].map((event) => (
                <div className="infrawork-events" key={event.id}>
                  <div className="infrawork-a">
                    <div className="infrawork-random-img">
                      <img
                        src={event.image}
                        style={{ width: "100%", height: "100%" }}
                        alt="random"
                      />
                    </div>
                  </div>
                  <div className="infrawork-a" style={{width:"200px",textAlign:"center",marginLeft:"10px"}}>
                    <div style={{fontWeight:"600",marginBottom:"5px"}}>{event.faculty_name}</div>
                    <h4 style={{ color: "#718EBF", fontWeight: "500" }}>
                      {event.mobile_number}
                    </h4>
                  </div>
                  <div className="infrawork-a infrawork-d">
                    {formatDateTime(event.start_at)}
                  </div>
                  <div className="infrawork-a infrawork-d">
                    {formatDateTime(event.end_at)}
                  </div>
                  <div className="infrawork-a infrawork-d">
                    {(() => {
                      const statuses = [
                        event.event_status,
                        event.event_guest_status,
                        event.accommodation_status,
                        event.transport_status,
                        event.event_participants_status,
                        event.venue_booking_status,
                        event.venue_requirement_status,
                        event.car_request_status,
                        event.food_request_status,
                        event.refreshment_request_status,
                      ];

                      if (
                        statuses.every((status) => status === 1 || status === 0)
                      ) {
                        return (
                          <p style={{ fontSize: "17px" }}>
                            <img
                              src={Pending} // Replace with the appropriate icon for "Pending"
                              alt="Pending"
                              style={{
                                marginRight: "8px",
                                verticalAlign: "middle",
                              }}
                            />
                            Pending
                          </p>
                        );
                      } else if (
                        statuses.some((status) => status === 3) ||
                        statuses.every((status) => status === 2)
                      ) {
                        return (
                          <p style={{ fontSize: "17px" }}>
                            <img
                              src={Assigned} // Replace with the appropriate icon for "Assigned"
                              alt="Assigned"
                              style={{
                                marginRight: "8px",
                                verticalAlign: "middle",
                              }}
                            />
                            Assigned
                          </p>
                        );
                      } else if (statuses.some((status) => status === 2)) {
                        return (
                          <p style={{ fontSize: "17px" }}>
                            <img
                              src={InProgress} // Replace with the appropriate icon for "In Progress"
                              alt="In Progress"
                              style={{
                                marginRight: "8px",
                                verticalAlign: "middle",
                              }}
                            />
                            In Progress
                          </p>
                        );
                      } else if (statuses.every((status) => status === 3)) {
                        return (
                          <p style={{ fontSize: "17px" }}>
                            <img
                              src={Completed} // Replace with the appropriate icon for "Completed"
                              alt="Completed"
                              style={{
                                marginRight: "8px",
                                verticalAlign: "middle",
                              }}
                            />
                            Completed
                          </p>
                        );
                      }
                      return null;
                    })()}
                  </div>

                  <div className="infrawork-a infrawork-d">
                    <button
                      onClick={() => handleViewClick(event)}
                      style={{ height: "40px", marginTop: "0" }}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EVENTMANAGERWORK;
