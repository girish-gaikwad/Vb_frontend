import { useState, useEffect } from "react";
import axios from "axios";
import account from "../../Assets/account_circle.png";
import person from "../../Assets/person.png";
import "./liveEvent.css";
import { helix } from "ldrs";
import TreeStructure from "../flowchart/flowCharts";
import SIDEBAR from "../sidebar/sidebar";
import { Card, CardBody, Stack, Image } from "@chakra-ui/react";

import { Link } from "react-router-dom";

function LiveEvent({ setSelectedEvent }) {
  // Accept setSelectedEvent as a prop
  const [card, setCard] = useState(false);
  const [eventx, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Registering helix (Assuming it's some custom component or effect)
  helix.register();

  function handleCardsView() {
    const imgtocard = document.querySelector(".imgcontainer");
    const changeDiv = document.querySelector(".change");

    if (eventx.length > 0 && changeDiv) {
      changeDiv.style.height = "100%";
    }

    if (imgtocard) {
      imgtocard.style.height = "auto"; // Adjust height based on content
      imgtocard.classList.add("fade-in"); // Add fade-in class for animation
    }
  }

  // Fetch events from the backend
  useEffect(() => {
    axios
      .get(`http://localhost:8000/get/eventdata`)
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
        if (response.data.length > 0) {
          setCard(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("503 Failed to Get Data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (eventx.length > 0) {
      handleCardsView();
    }
  }, [eventx]);

  const formatDate = (isoString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { day, month: months[parseInt(month) - 1], year };
  };

  if (loading) {
    return (
      <div
        className="loading-container"
        style={{ width: "100%", backgroundColor: "white" }}
      >
        <l-helix size="95" speed="2.5" color="rgb(29, 60, 140)"></l-helix>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="loading-container"
        style={{ width: "100%", backgroundColor: "white" }}
      >
        <l-helix size="95" speed="2.5" color="black"></l-helix>
        <p style={{ color: "red", marginTop: "30px" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="createbutton">
        <div>
          {card ? <h3 className="titlename">Live events</h3> : <h2></h2>}
        </div>
        <Link to={"/tree"}>
          <button id="Cbutton">Create +</button>
        </Link>
      </div>
      <div className="cardscover">
        <div
          className={`imgcontainer ${card ? "grid fade-in" : "flex fade-in"}`}
        >
          {card ? (
            eventx.map((event, index) => (
              <Link
                to={`/registered-event/${event.id}`}
                key={index}
                onClick={() => setSelectedEvent(event)} // Set the selected event data
              >
                <Card className="chakracard">
                  <CardBody>
                    <div className="imgdiv">
                      <Image
                        src="/images/thumnail.png"
                        alt="Event Image"
                        borderRadius="lg"
                        objectFit="contain" /* Ensures the image covers the given height and width without distortion */
                      />
                    </div>

                    <Stack mt="6" spacing="3">
                      <div className="data">
                        <div className="left-data">
                          <h2>{formatDate(event.start_at).month}</h2>
                          <p>
                            {formatDate(event.start_at).day} -{" "}
                            {formatDate(event.end_at).day}
                          </p>
                          <h6
                            className={
                              event.status === 1
                                ? "status1"
                                : event.status === 2
                                ? "status2"
                                : event.status === 3
                                ? "status3"
                                : ""
                            }
                          >
                            {event.status === 1
                              ? "CREATED NOW"
                              : event.status === 2
                              ? "IN-PROGRESS"
                              : event.status === 3
                              ? "ASSIGNED"
                              : ""}
                            &nbsp;
                          </h6>
                        </div>
                        <div className="right-data">
                          <h2>{event.event_code}</h2>
                          <h5>{event.event_name}</h5>
                        </div>
                      </div>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
            ))
          ) : (
            <img src={person} alt="Person" id="personx" />
          )}
        </div>
      </div>
    </>
  );
}

export default LiveEvent;