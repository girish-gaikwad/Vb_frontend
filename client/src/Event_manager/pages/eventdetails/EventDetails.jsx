// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function EventDetails({ selectedEvent }) {
//   const navigate = useNavigate();

//   if (!selectedEvent) {
//     return <div>No event selected.</div>;
//   }

//   return (
//     <div>
//       <h1>Event Details</h1>
//       <p><strong>Faculty:</strong> {selectedEvent.name}</p>
//       <p><strong>Contact:</strong> {selectedEvent.contact}</p>
//       <p><strong>Start Time:</strong> {selectedEvent.startdateTime}</p>
//       <p><strong>End Time:</strong> {selectedEvent.enddateTime}</p>
//       <p><strong>Status:</strong> {selectedEvent.status}</p>
//       <button onClick={() => navigate(-1)}>Back</button>
//     </div>
//   );
// }

// export default EventDetails;

import React, { useEffect, useState } from "react";
import "./EventDetails.css";
import axios from "axios";
import Event from "../../../Assets/Event.png";
import Guest from "../../../Assets/Guest.png";
import Participants from "../../../Assets/Participants.png";
import Venue from "../../../Assets/Venue.png";
import Transport from "../../../Assets/Transport.png";
import Accomodation from "../../../Assets/Accomodation.png";
import Food from "../../../Assets/Food.png";
import VenueRequirements from "../../../Assets/Venue Requirements.png";
import { CircularProgress } from "@mui/material";
import SpecialRequest from "../specialrequest/specialrequest";
import { SlCalender } from "react-icons/sl";
import Chip from "@mui/material/Chip";
import { IoMdCall } from "react-icons/io";

const treeData = [
  {
    id: "Event",
    image: Event,
    children: [
      {
        id: "Invitees",
        image: Guest,
        children: [
          {
            id: "Guest",
            image: Guest,
            children: [
              {
                id: "Accomodation",
                image: Accomodation,
              },
              {
                id: "Transport",
                image: Transport,
              },
            ],
          },
          {
            id: "Participants",
            image: Participants,
          },
        ],
      },
      {
        id: "Venue",
        image: Venue,
        children: [
          {
            id: "Venue Requirements",
            image: VenueRequirements,
          },
        ],
      },
    ],
  },
];
const   EventDetails = () => {
  const [isEventCompleted, setIsEventCompleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const [progressMap, setProgressMap] = useState({ Invitees: 0 });
  const [completedItems, setCompletedItems] = useState([]);
  const [changeborder, setborder] = useState({});
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [sidePanelContent, setSidePanelContent] = useState(null);

  console.log(selectedItem);

  const handleBoxClick = (item) => {
    console.log("Box Clicked Item: ", item);
    if (item.id === "Event") {
      setSelectedItem(item);
      setSidePanelContent(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {item.id} Details
          </h3>
          <br />
          <div
            style={{
              paddingLeft: "22%",
            }}
          >
            <p>
              &#x2022; Event Name : <br /> ITRONZ
            </p>
          </div>
          <br />
          <div
            style={{
              paddingLeft: "22%",
            }}
          >
            <p>
              &#x2022; Event Type : <br /> Conference
            </p>{" "}
          </div>
          <br />
          <div
            style={{
              paddingLeft: "22%",
            }}
          >
            <p>
              &#x2022; From Date/Time : <br />
              <SlCalender /> 08/07/24 -09:00 am{" "}
            </p>{" "}
          </div>
          <br />
          <div
            style={{
              paddingLeft: "22%",
            }}
          >
            <p>
              &#x2022; To Date/Time : <br /> <SlCalender /> 09/07/24-04:00 pm{" "}
            </p>{" "}
          </div>
          <br />
          <div
            style={{
              paddingLeft: "22%",
            }}
          >
            <p>
              &#x2022; Assigned to : <br /> Skill team{" "}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              style={{ width: "80px", height: "35px" }}
              onClick={() => handleSave(item)}
            >
              ok
            </button>
          </div>
        </div>
      );
      setIsSidePanelOpen(true);
    }
    if (item.id === "Guest") {
      setSelectedItem(item);
      setSidePanelContent(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {item.id} Details
          </h3>
          <div
            style={{
              padding: "15px",
            }}
          >
            <p>
              &#x2022; 1. Mr .Raja &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              <Chip
                label="Designer"
                style={{ backgroundColor: "#B6E9D1", color: "white" }}
              />
              <br />
              &nbsp; <IoMdCall /> &nbsp; 8778943284
            </p>{" "}
          </div>
          <div
            style={{
              padding: "15px",
            }}
          >
            <p>
              &#x2022; 1. Mr .Raja &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              <Chip
                label="Designer"
                style={{ backgroundColor: "#B6E9D1", color: "white" }}
              />
              <br />
              &nbsp; <IoMdCall /> &nbsp; 8778943284
            </p>{" "}
          </div>
          <div
            style={{
              padding: "15px",
            }}
          >
            <p>
              &#x2022; 1. Mr .Raja &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              <Chip
                label="Designer"
                style={{ backgroundColor: "#B6E9D1", color: "white" }}
              />
              <br />
              &nbsp; <IoMdCall /> &nbsp; 8778943284
            </p>{" "}
          </div>
          <div
            style={{
              padding: "15px",
            }}
          >
            <p>
              Event Incharge : <br />
              &nbsp; Dr. Gautham
              <br />
              &nbsp; <IoMdCall /> &nbsp; 8778943284
            </p>{" "}
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              style={{ width: "100px", height: "35px" }}
              onClick={() => handleSave(item)}
            >
              Asign
            </button>
          </div>{" "}
        </div>
      );
      setIsSidePanelOpen(true);
    }
    if (item.id === "Accomodation") {
      setSelectedItem(item);
      setSidePanelContent(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {item.id} Details
          </h3>
          <div
            style={{
              padding: "15px",
            }}
          >
            <p>
              &#x2022; 1. Mr .Raja &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              <br />
              &nbsp; &nbsp; &#x2022; Bit Guest house
              <br />
              &nbsp; &nbsp; &nbsp; date <br />
              &nbsp; &nbsp; &nbsp; 16-06-2006 to 16-06-2024
            </p>{" "}
          </div>
          <div
            style={{
              padding: "15px",
            }}
          >
            <p>
              &#x2022; 2. Mr .Raja &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              <br />
              &nbsp; &nbsp; &#x2022; Bit Guest house
              <br />
              &nbsp; &nbsp; &nbsp; date <br />
              &nbsp; &nbsp; &nbsp; 16-06-2006 to 16-06-2024
            </p>{" "}
          </div>
          <div
            style={{
              padding: "15px",
            }}
          >
            <p>
              &#x2022; 3. Mr .Raja &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              <br />
              &nbsp; &nbsp; &#x2022; Bit Guest house
              <br />
              &nbsp; &nbsp; &nbsp; date <br />
              &nbsp; &nbsp; &nbsp; 16-06-2006 to 16-06-2024
            </p>{" "}
          </div>
          <div
            style={{
              padding: "15px",
            }}
          >
            <p>
              Hostel Manager : <br />
              &nbsp; Dr. Gautham
              <br />
              &nbsp; <IoMdCall /> &nbsp; 8778943284
            </p>{" "}
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              style={{ width: "100px", height: "35px", marginBottom: "10px" }}
              onClick={() => handleSave(item)}
            >
              Asign
            </button>
          </div>{" "}
        </div>
      );
      setIsSidePanelOpen(true);
    }
    if (item.id === "Venue") {
      setSelectedItem(item);
      setSidePanelContent(
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "300px",
            margin: "auto",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#4b91f1",
              marginBottom: "10px",
            }}
          >
            Venue details
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p style={{ margin: 0, color: "#333" }}>• Venue capacity</p>
              <input
                type="text"
                value="20"
                style={{
                  width: "40px",
                  textAlign: "center",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  padding: "2px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0, fcolor: "#333" }}>• Venue type &nbsp;</p>
              <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>
                Classroom
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <p style={{ margin: 0, fontSize: "16px", color: "#333" }}>Date</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <img
                src="/images/calender.png"
                alt="Calendar"
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
              <p style={{ margin: 0, fontSize: "14px", color: "#4b91f1" }}>
                01-7-2024 to 01-7-2024
              </p>
            </div>
          </div>

          <div style={{ color: "#4b91f1", marginBottom: "20px" }}>
            <p style={{ margin: 0 }}>Venue Team :</p>
            <p style={{ margin: "5px 0" }}>Dr. Gautham</p>
            <p style={{ margin: 0 }}>📞 9587643455</p>
          </div>

          <button
            style={{
              backgroundColor: "#4b91f1",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              width: "100%",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={() => handleSave(item)}
          >
            Assign
          </button>
        </div>
      );
      setIsSidePanelOpen(true);
    }
    if (item.id === "Venue Requirements") {
      setSelectedItem(item);
      setSidePanelContent(
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "300px",
            margin: "auto",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#fff",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#4b91f1",
              marginBottom: "10px",
            }}
          >
            Requirements
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p style={{ margin: 0, color: "#333" }}>• Venue count</p>
              <input
                type="text"
                value="5"
                style={{
                  width: "40px",
                  textAlign: "center",
                  borderRadius: "4px",
                  border: "1px solid #333",
                  padding: "2px",
                }}
              />
            </div>
          </div>

          <h3 style={{ color: "#4b91f1", marginBottom: "10px" }}>
            Venue Requirements
          </h3>

          <div style={{ marginBottom: "20px" }}>
            {[
              { name: "Mike", value: "5" },
              { name: "Chair", value: "3" },
              { name: "Momentum", value: "6" },
              { name: "Mike", value: "5" },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <p style={{ margin: 0, color: "#333" }}>• {item.name}</p>
                <input
                  type="text"
                  value={item.value}
                  style={{
                    width: "40px",
                    textAlign: "center",
                    borderRadius: "4px",
                    border: "1px solid #333",
                    padding: "2px",
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>Date</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <img
                src="path/to/calendar-icon.png"
                alt="Calendar"
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
              <p style={{ margin: 0, fontSize: "14px", color: "#4b91f1" }}>
                01-7-2024 to 02-7-2024
              </p>
            </div>
          </div>

          <div style={{ color: "#4b91f1", marginBottom: "20px" }}>
            <p style={{ margin: 0 }}>Venue Team :</p>
            <p style={{ margin: "5px 0" }}>Dr. Gautham</p>
            <p style={{ margin: 0 }}>📞 9587643455</p>
          </div>

          <button
            style={{
              backgroundColor: "#4b91f1",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              width: "100%",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={() => handleSave(item)}
          >
            Assign
          </button>
        </div>
      );
      setIsSidePanelOpen(true);
    }
    if (item.id === "Participants") {
      setSelectedItem(item);
      setSidePanelContent(
        <div
          style={{
            // border: "2px dashed #d3d3d3",
            padding: "20px",
            // borderRadius: "10px",
            // maxWidth: "310px",
            margin: "auto",
            // fontFamily: "Arial, sans-serif"
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#4b91f1",
              marginBottom: "10px",
            }}
          >
            Participants details
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0 }}>Count</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    color: "#fff",
                    backgroundColor: "#b2f2bb",
                  }}
                >
                  Internal
                </span>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    color: "#fff",
                    backgroundColor: "#8ce99a",
                  }}
                >
                  External
                </span>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <img
                    src="/images/boys.png"
                    alt="Boy"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div style={{ fontSize: "14px", color: "#333" }}>
                    Boys{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      13
                    </span>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <img
                    src="/images/girls.png"
                    alt="Girl"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div style={{ fontSize: "14px", color: "#333" }}>
                    Girls{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      15
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <img
                    src="/images/male.png"
                    alt="Male Faculty"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div style={{ fontSize: "14px", color: "#333" }}>
                    Male Faculty{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      2
                    </span>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <img
                    src="/images/female.png"
                    alt="Female Faculty"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div style={{ fontSize: "14px", color: "#333" }}>
                    Female Faculty{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0 }}>Count</h3>
              <span
                style={{
                  padding: "5px 10px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  color: "#fff",
                  backgroundColor: "#63e6be",
                }}
              >
                Accomodation
              </span>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <img
                    src="/images/boys.png"
                    alt="Boy"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div style={{ fontSize: "14px", color: "#333" }}>
                    Boys{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      13
                    </span>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <img
                    src="/images/girls.png"
                    alt="Girl"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div style={{ fontSize: "14px", color: "#333" }}>
                    Girls{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      15
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <img
                    src="/images/male.png"
                    alt="Male Faculty"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div style={{ fontSize: "14px", color: "#333" }}>
                    Male Faculty{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      2
                    </span>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <img
                    src="/images/female.png"
                    alt="Female Faculty"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div style={{ fontSize: "14px", color: "#333" }}>
                    Female Faculty{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ color: "#4b91f1", marginBottom: "20px" }}>
            <p style={{ margin: 0 }}>Hostel Manager :</p>
            <p style={{ margin: "5px 0" }}>Dr. Gautham</p>
            <p style={{ margin: 0 }}>📞 9587643455</p>
          </div>

          <button
            style={{
              backgroundColor: "#4b91f1",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              width: "100%",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={() => handleSave(item)}
          >
            Assign
          </button>
        </div>
      );
      setIsSidePanelOpen(true);
    }
    if (item.id === "Transport") {
      setSelectedItem(item);
      setSidePanelContent(
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              {item.id} Details
            </h3>
            <div style={{ width: "90%", marginLeft: "10%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                &#x2022; 1. Mr .Raja &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; <img src="/images/alone.png" alt="" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Sathy <img src="/images/arrowT.png" alt="" /> Trichy
              </div>
              &nbsp; &nbsp; &nbsp; date <br />
              &nbsp; &nbsp; &nbsp; 16-06-2006 to 16-06-2024
            </div>{" "}
            <br />
            <div style={{ width: "90%", marginLeft: "10%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                &#x2022; 2. Mr .Raja &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; <img src="/images/alone.png" alt="" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Sathy <img src="/images/arrowT.png" alt="" /> Trichy
              </div>
              &nbsp; &nbsp; &nbsp; date <br />
              &nbsp; &nbsp; &nbsp; 16-06-2006 to 16-06-2024
            </div>{" "}
            <br />
            <div style={{ width: "90%", marginLeft: "10%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                &#x2022; 3. Mr .Raja &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; <img src="/images/alone.png" alt="" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Sathy <img src="/images/arrowT.png" alt="" /> Trichy
              </div>
              &nbsp; &nbsp; &nbsp; date <br />
              &nbsp; &nbsp; &nbsp; 16-06-2006 to 16-06-2024
            </div>{" "}
          </div>
          <div
            style={{
              padding: "15px",
            }}
          >
            <p>
              Transport Manager : <br />
              &nbsp; Dr. Gautham
              <br />
              &nbsp; <IoMdCall /> &nbsp; 8778943284
            </p>{" "}
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              style={{ width: "100px", height: "35px", marginBottom: "10px" }}
              onClick={() => handleSave(item)}
            >
              Asign
            </button>
          </div>{" "}
        </>
      );
      setIsSidePanelOpen(true);
    }
  };

  const handleSave = (item) => {
    if (!item) {
      console.error("No item selected.");
      return;
    }

    console.log("Selected Item for Save:", item);

    setColorMap((prev) => ({
      ...prev,
      [item.id]: "#bbcbf2", // Change color to blue
    }));

    setborder((prev) => ({
      ...prev,
      [item.id]: "2.5px solid #2d5dd9", // Change border to blue
    }));

    if (item.id === "Event") {
      setIsEventCompleted(true);
    }

    if (
      ["Guest", "Participants", "Accomodation", "Transport"].includes(
        item.id
      ) &&
      !completedItems.includes(item.id)
    ) {
      setCompletedItems((prev) => [...prev, item.id]);

      setProgressMap((prev) => ({
        ...prev,
        Invitees: Math.min(prev.Invitees + 25, 100), // Increase by 25% per node completion
      }));
    }
  };

  return (
    
    <>
    <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent: isSidePanelOpen ? "flex-start" : "center",}}> 

        <div className="tree">
      {treeRendering(
        treeData,
        handleBoxClick,
        colorMap,
        changeborder,
        progressMap
      )}
      <div className="relative">
        <SpecialRequest />
      </div>
  
    </div>
      {isSidePanelOpen && (
        
          <div
            style={{
              width: "18%",
              // height: "60%",
              maxHeight:"55%",
              border: "2px dashed #d3d3d3",
              borderRadius: "11px",
              overflowY: "scroll",
              position:"absolute",
              top:"23%",
              left:"79%"
            }}
          >
            {sidePanelContent}
          </div>
        
      )}
      </div>

  
    <div className="confirmsubmit">
      <button type="submit">Go Back</button>
      <button type="submit" onClick={confirm}>
        Confirm
      </button>
    </div>
  </>
  
    
  );
};

const treeRendering = (
  treeData,
  handleBoxClick,
  colorMap,
  changeborder,
  progressMap
) => {

  console.log(colorMap)
  return (
    <ul>
      {treeData.map((item) => (
        <li key={item.id} className={`${item.text} ${item.id}`}>
          <div className="logoimage" onClick={() => handleBoxClick(item)}>
            <div
              className="formbox"
              style={{
                border:
                  item.id !== "Invitees"
                    ? changeborder[item.id] || "2.5px solid #f77575"
                    : "none",
                backgroundColor:
                  item.id !== "Invitees"
                    ? colorMap[item.id] || "#fe6f6f45"
                    : "transparent",
                cursor:
                  item.id !== "Event" &&
                  !colorMap["Event"] &&
                  item.id !== "Invitees"
                    ? "not-allowed"
                    : "pointer" && item.id === "Invitees"
                    ? "context-menu"
                    : "",
                position: "relative",
              }}
            >
              {item.id === "Invitees" && (
                <div
                  style={{
                    position: "absolute",
                    top: 1,
                    left: 3,
                    zIndex: 1,
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size="80px"
                    thickness={2}
                    className="grayProgress"
                    style={{
                      position: "absolute",
                      top: 2,
                      left: 8,
                      zIndex: 1,
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={progressMap.Invitees}
                    size="80px"
                    thickness={2}
                    className="redProgress"
                    style={{
                      position: "absolute",
                      top: 2,
                      left: 8,
                      zIndex: 1,
                    }}
                  />
                </div>
              )}
              <img
                src={item.image}
                alt={item.id}
                style={{
                  position: "relative",
                  width: item.id === "Invitees" ? "70px" : "",
                  top: item.id === "Invitees" ? "10px" : "",
                  height: item.id === "Invitees" ? "auto" : "",
                }}
              />
              <h6
                className="flowname"
                style={{
                  position: "relative",
                  top: item.id === "Invitees" ? "15px" : "",
                }}
              >
                {item.id}
              </h6>
            </div>
          </div>
          {item.children && item.children.length
            ? treeRendering(
                item.children,
                handleBoxClick,
                colorMap,
                changeborder,
                progressMap
              )
            : null}
        </li>
      ))}
    </ul>
  );
};

export default EventDetails;
