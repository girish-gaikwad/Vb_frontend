import React, { useEffect, useState } from "react";
import "./eventdetails.css";
import axios from "axios";
import Event from "../../Assets/Event.png";
import Guest from "../../Assets/Guest.png";
import Participants from "../../Assets/Participants.png";
import Venue from "../../Assets/Venue.png";
import Transport from "../../Assets/Transport.png";
import Accomodation from "../../Assets/Accomodation.png";
import Food from "../../Assets/Food.png";
import VenueRequirements from "../../Assets/Venue Requirements.png";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import SpecialRequest from "./specialrequest";
import { SlCalender } from "react-icons/sl";
import Chip from "@mui/material/Chip";
import { IoMdCall } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AssignButton from "./assignbutton";
import { ContactPageSharp } from "@mui/icons-material";
import { Fa500Px } from "react-icons/fa";
import Popup from "./popup";

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
            id: "Venue_Requirements",
            image: VenueRequirements,
          },
        ],
      },
    ],
  },
];

const EventDetailsriser = ({ selectedEvent, user }) => {
  const { id: event_id } = useParams(); // Extract the id from the URL using useParams
  const [isEventCompleted, setIsEventCompleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const [progressMap, setProgressMap] = useState({ Invitees: 0 });
  const [completedItems, setCompletedItems] = useState([]);
  const [changeborder, setborder] = useState({});
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [sidePanelContent, setSidePanelContent] = useState(null);
  const [ShowPencil, setShowPencil] = useState(false); // Set the initial state to false
  const [disabledItems, setDisabledItems] = useState(new Set()); // Track disabled items

  // 1234
  const [event, setEvent] = useState([]);
  const [GuestData, setGuestData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/get/eventparticipentsvenuerequirement/${event_id}`
      )
      .then((response) => {
        setEvent(response.data[0]); // Set event state with the response data
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("503 Failed to Get Data");
      });
  }, [event_id]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/get/guestaccommodationtransportDetails/${event_id}`
      )
      .then((response) => {
        // console.log(response.data[0].event_name);

        setGuestData(response.data); // Set event state with the response data
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("503 Failed to Get Data");
      });
  }, [event_id]);

  useEffect(() => {
    const getStatusColor = (status) => {
      switch (status) {
        case 0: // Status 0 might indicate a pending or inactive status
          return "#f2bbcb"; // Example: Red-ish color for pending/inactive
        case 1: // Status 1 might indicate an active or confirmed status
          return "#bbcbf2"; // Example: Blue-ish color for active/confirmed
        case 2: // Status 2 might indicate a completed status
          return "#b2f2bb"; // Example: Green-ish color for completed
        default: // Default color for unknown or null status
          return "#d3d3d3"; // Grey color for unknown status
      }
    };

    setColorMap({
      Event: getStatusColor(event.event_status), // Conditionally set based on event_status
      Venue: getStatusColor(event.venue_status), // Conditionally set based on venue_status
      Venue_Requirements: getStatusColor(event.requirement_status), // Conditionally set based on requirement_status
      Participants: getStatusColor(event.participants_status), // Conditionally set based on participants_status

      // Guest: getStatusColor(event.event_status),
      // Accomodation: getStatusColor(event.event_status),
      // Transport: getStatusColor(event.event_status) // Conditionally set based on guest_status

      Guest: getStatusColor(GuestData.guest_status), // Conditionally set based on guest_status
      Accomodation: getStatusColor(GuestData.accommodation_status), // Conditionally set based on guest_status
      Transport: getStatusColor(GuestData.transport_status), // Conditionally set based on guest_status
    });
  }, [event, GuestData]); // Dependencies: Only re-run if `event` or `GuestData` changes

  // console.log(event)
  if (error) {
    return <p>{error}</p>;
  }
  if (!event) {
    return <p>Loading event details...</p>; // Show a loading message if the event data is not yet fetched
  }


  if(user!=="user"){

    if (!selectedEvent) {
        return (
            <>
              {" "}
              <p>No event selected.</p> <Link to={"/"}>back to main page</Link>{" "}
            </>
          );
        }
      }

  const [requestclick, setrequestclick] = useState(false);
  const [repopup, setrepopup] = useState(false);
  // const[recontent,setrecontent]=useState(false)

  const handleReRequestClick = () => {
    setrequestclick(true);
    setShowPencil(true); // Toggle the ShowPencil state to true when the button is clicked
  };

  const calculateProgress = (
    treeData,
    colorMap,
    targetColor,
    relevantNodes
  ) => {
    let totalNodes = 0;
    let matchingNodes = 0;

    const traverse = (nodes) => {
      nodes.forEach((node) => {
        if (relevantNodes.includes(node.id)) {
          totalNodes++;
          if (colorMap[node.id] === targetColor) {
            matchingNodes++;
          }
          // console.log(
          //   `Node: ${node.id}, Color: ${
          //     colorMap[node.id]
          //   }, Total: ${totalNodes}, Matching: ${matchingNodes}`
          // );
        }
        if (node.children && node.children.length) {
          traverse(node.children);
        }
      });
    };

    traverse(treeData);

    return totalNodes > 0 ? (matchingNodes / totalNodes) * 100 : 0;
  };

  const eventDetailsArray = [
    { name: "Chair", value: event.chair_count },
    { name: "Dais Table", value: event.dais_table_count },
    { name: "White Board", value: event.white_board_count },
    { name: "Hand Mic", value: event.hand_mic_count },
    { name: "Help Desk", value: event.help_desk_count },
    { name: "Collar Mic", value: event.collar_mic_count },
    { name: "Internet", value: event.internet_count },
    { name: "Live Stream", value: event.live_stream_count },
    { name: "Biometric", value: event.biometric_count },
    { name: "Photography", value: event.photography_count },
    { name: "Videography", value: event.videography_count },
    { name: "Large Momentum", value: event.large_momento_count },
    { name: "Small Momentum", value: event.small_momento_count },
    { name: "Shawl", value: event.shawl_count },
    { name: "Pen/Pencil", value: event.pen_pencil_count },
    { name: "Scribbling Pad", value: event.scribbling_pad_count },
    { name: "Water Bottle", value: event.water_bottle_count },
    { name: "Others", value: event.others },
  ];

  useEffect(() => {
    const relevantNodes = [
      "Accomodation",
      "Transport",
      "Participants",
      "Guest",
    ];
    const progress = calculateProgress(
      treeData,
      colorMap,
      "#bbcbf2",
      relevantNodes
    ); // Assuming blue color is '#bbcbf2'
    setProgressMap((prev) => ({ ...prev, Invitees: progress }));
  }, [treeData, colorMap]);

  useEffect(() => {
    if (selectedItem) {
      setColorMap((prevColorMap) => ({
        ...prevColorMap,
        [selectedItem]: "#bbcbf2",
      }));
    }
  }, [selectedItem]); // Ensures this runs whenever selectedItem changes

  useEffect(() => {
    console.log("Selected item updated:", selectedItem);
  }, [selectedItem]);

  const adminasign = (item) => {
    setSelectedItem(item);
    setDisabledItems((prev) => new Set(prev).add(item)); // Disable the clicked button
  };
  console.log(disabledItems);

  const closePopup = () => {
    setrepopup(false);
  };

  const handleBoxClick = (item) => {
    if (!requestclick) {
      if (item.id === "Event") {
        setSidePanelContent(
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <h3
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                width: "100%",
                display: "flex",
                color: "#4b91f1",
                justifyContent: "center",
              }}
            >
              {item.id} Details
            </h3>

            <div>
              <div style={{ marginBottom: "15px" }}>
                <p>&#x2022; Event Name :</p>
                <div className="servervalues"> {event.event_name || "-"}</div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <p>&#x2022; Event Type :</p>{" "}
                <div className="servervalues">{event.event_type || "-"}</div>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <p>&#x2022; From Date/Time :</p>

                <div className="servervalues">
                  <SlCalender /> {new Date(event.start_at).toLocaleString()}
                </div>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <p>&#x2022; To Date/Time :</p>

                <div className="servervalues">
                  <SlCalender /> {new Date(event.end_at).toLocaleString()}
                </div>
              </div>
              <div>
                <p>&#x2022; Assigned to :</p>
                <div className="servervalues">{event.assigned_to || "-"}</div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {user === "eventmanager" && (
                <AssignButton
                  key={item.id}
                  adminasign={adminasign}
                  item={item.id}
                  isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                />
              )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Guest") {
        // setSelectedItem(item.id);
        setSidePanelContent(
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "space-between",
              width: "100%",
            }}
          >
            <>
              <h3
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                  color: "#4b91f1",
                }}
              >
                {item.id} Details
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%", // Ensure the container has height
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {GuestData.map((guest, index) => (
                    <div key={index}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center", // Aligns the items vertically in the center
                          padding: "5px", // Optional: Add some padding for better spacing
                        }}
                      >
                        <p style={{ fontSize: "14px", margin: 0 }}>
                          &#x2022; {index + 1}. {guest.salutation}{" "}
                          {guest.first_name} {guest.last_name}
                        </p>

                        <Chip
                          label={guest.designation}
                          style={{ backgroundColor: "#B6E9D1", color: "white" }}
                        />
                      </div>

                      <div
                        className="servervalues"
                        style={{ margin: 0, padding: 0 }}
                      >
                        &nbsp; <IoMdCall /> &nbsp; {guest.phone_number}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "auto", padding: "15px" }}>
                  <p style={{ color: "#4b91f1" }}>Event Incharge:</p>
                  <div>&nbsp; Dr. Gautham</div>
                  <div>
                    &nbsp; <IoMdCall /> 8778943284
                  </div>
                </div>
              </div>
            </>

            <div
              style={{ display: "flex", justifyContent: "end", margin: "10px" }}
            >
              {user === "eventmanager" && (
                <AssignButton
                  key={item.id}
                  adminasign={adminasign}
                  item={item.id}
                  isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                />
              )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Accomodation") {
        // setSelectedItem(item.id);
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
                paddingTop: "10px",
                color: "#4b91f1",
              }}
            >
              {item.id} Details
            </h3>

            {GuestData.length > 0 ? (
              GuestData.map((accommodation, index) => (
                <div key={index} style={{ paddingTop: "15px" }}>
                  <p style={{ padding: 0, margin: 0 }}>
                    &#x2022; {index + 1}.{" "}
                    {/* {accommodation.is_alone === 1 ? "Alone" : "Not Alone"}{" "}  */}
                    {accommodation.first_name} {accommodation.last_name}
                  </p>

                  <div className="servervalues">
                    🔹&nbsp; car {accommodation.accommodation_venue}
                  </div>

                  <div className="servervalues">
                    &nbsp; &nbsp;
                    <span style={{ color: "#2782DD", fontWeight: "600" }}>
                      Date
                    </span>
                  </div>

                  <div className="servervalues" style={{ fontSize: "14px" }}>
                    &nbsp; &nbsp;{" "}
                    {new Date(
                      accommodation.accommodation_arrival
                    ).toLocaleDateString()}{" "}
                    to{" "}
                    {new Date(
                      accommodation.accommodation_departure
                    ).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <p>No accommodation data available.</p>
            )}

            <div style={{ marginTop: "14px" }}>
              <p style={{ color: "#4b91f1" }}>Hostel Manager:</p>
              <div>&nbsp; Dr. gaikwad</div>
              <div>
                &nbsp; <IoMdCall /> 8778943284
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {user === "eventmanager" && (
                <AssignButton
                  key={item.id}
                  adminasign={adminasign}
                  item={item.id}
                  isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                />
              )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Transport") {
        // setSelectedItem(item.id);
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
                paddingTop: "10px",
                color: "#4b91f1",
              }}
            >
              Guest {item.id} details
            </h3>

            {GuestData.map((transport, index) => (
              <div
                key={index}
                style={{ width: "90%", marginLeft: "10%", marginTop: "5%" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  &#x2022; {index + 1}. {transport.salutation}{" "}
                  {transport.first_name} {transport.last_name} &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                  <img
                    src={
                      transport.transport_is_alone === 0
                        ? "/images/combained.png"
                        : transport.transport_is_alone === 1
                        ? "/images/alone.png"
                        : "/img/no-alone.png"
                    }
                    alt=""
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {transport.from_place || "- "}&nbsp;&nbsp;
                  <img src="/images/arrowT.png" alt="" />{" "}
                  {transport.to_place || "-"}
                </div>
                &nbsp; &nbsp; &nbsp;
                <span style={{ color: "#2782DD", fontWeight: "600" }}>
                  Date
                </span>{" "}
                <div style={{ fontSize: "14px" }}>
                  &nbsp; &nbsp; &nbsp;{" "}
                  {new Date(transport.transport_arrival).toLocaleDateString()}{" "}
                  <span style={{ color: "#2782DD" }}>to</span>{" "}
                  {new Date(transport.transport_departure).toLocaleDateString()}
                </div>
              </div>
            ))}

            <div style={{ marginTop: "14px", marginLeft: "10%" }}>
              <p style={{ color: "#4b91f1" }}>Hostel Manager:</p>
              <div>&nbsp; Dr. gaikwad</div>
              <div>
                &nbsp; <IoMdCall /> 8778943284
              </div>
            </div>

            <div
              style={{ display: "flex", justifyContent: "end", margin: "10px" }}
            >
              {user === "eventmanager" && (
                <AssignButton
                  key={item.id}
                  adminasign={adminasign}
                  item={item.id}
                  isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                />
              )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Venue") {
        console.log("iam from venue", item.id);
        // setSelectedItem(item.id);
        setSidePanelContent(
          <Box
            sx={{
              borderRadius: "8px",
              padding: "16px",
              maxWidth: "300px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#1976d2", marginBottom: "16px" }}
            >
              Venue details
            </Typography>

            <Box sx={{ marginBottom: "8px" }}>
              <Typography variant="body1" sx={{ display: "inline" }}>
                • Venue capacity :
              </Typography>

              <input
                type="text"
                value={event.capacity || "-"}
                style={{
                  // width: "40px",
                  textAlign: "center",
                  borderRadius: "4px",
                  border: "1px solid #333",
                  padding: "2px",
                  marginLeft: "8px",
                  width: "60px",
                }}
                readOnly // To prevent editing, since it's just displaying the value
              />
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <Typography variant="body1">
                • Venue type : {event.venue_type || "-"}
              </Typography>
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <Typography
                variant="body1"
                sx={{ color: "#1976d2", marginBottom: "8px" }}
              >
                Date
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/images/calender.png"
                  alt="Calendar"
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                <Typography variant="body2">
                  {new Date(event.start_at).toLocaleDateString()} -{" "}
                  {new Date(event.end_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <Typography
                variant="body1"
                sx={{ color: "#1976d2", marginBottom: "8px" }}
              >
                Venue Team :
              </Typography>
              <Typography variant="body2">Dr. Gautham</Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", marginTop: "4px" }}
              >
                {/* <PhoneIcon sx={{ marginRight: '8px', color: '#1976d2' }} />  */}
                <Typography variant="body2">9587643455</Typography>
              </Box>
            </Box>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
              }}
            >
              {user === "eventmanager" && (
                <AssignButton
                  key={item.id}
                  adminasign={adminasign}
                  item={item.id}
                  isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                />
              )}
            </div>
          </Box>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Venue_Requirements") {
        // setSelectedItem(item.id);
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
                  value={event.venue_count || 1}
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
              {eventDetailsArray
                .filter((item) => item.value > 0) // Filter items with value > 0
                .map((item, index) => (
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
                      readOnly // To prevent editing, since it's just displaying the value
                    />
                  </div>
                ))}
            </div>

            <div>
              <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>Date</p>
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
                  {new Date(event.start_at).toLocaleDateString()} -{" "}
                  {new Date(event.end_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "10px", padding: "5px" }}>
              <p style={{ color: "#4b91f1" }}>Event Incharge:</p>
              <div>&nbsp; Dr. Gautham</div>
              <div>
                &nbsp; <IoMdCall /> 8778943284
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
              }}
            >
              {user === "eventmanager" && (
                <AssignButton
                  key={item.id}
                  adminasign={adminasign}
                  item={item.id}
                  isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                />
              )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Participants") {
        // setSelectedItem(item.id);
        setSidePanelContent(
          <div
            style={{
              padding: "15px",
              // margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#4b91f1",
                marginBottom: "10px",
                fontSize: "18px",
              }}
            >
              Participants details
            </h2>

            <div style={{ marginBottom: "5px" }}>
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

                    // justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      width: "45%",
                    }}
                  >
                    <img
                      src="/images/boys.png"
                      alt="Boy"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#333",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      Boys{" "}
                      <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                        {event.ex_boys_count || "-"}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <img
                      src="/images/girls.png"
                      alt="Girl"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#333",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      Girls{" "}
                      <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                        {event.ex_girls_count || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <img
                      src="/images/male.png"
                      alt="Male Faculty"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <div
                      style={{
                        fontSize: "11px", // Set the font size only once
                        color: "#333",
                        display: "flex",
                        flexDirection: "column",
                        width: "auto", // Adjust width as necessary
                        whiteSpace: "nowrap", // Prevent text wrapping
                      }}
                    >
                      Male Faculty{" "}
                      <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                        {event.male_faculty_count || "-"}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <img
                      src="/images/female.png"
                      alt="Female Faculty"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <div
                      style={{
                        fontSize: "11px", // Set the font size only once
                        color: "#333",
                        display: "flex",
                        flexDirection: "column",
                        width: "auto", // Adjust width as necessary
                        whiteSpace: "nowrap", // Prevent text wrapping
                      }}
                    >
                      Female Faculty{" "}
                      <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                        {event.female_faculty_count || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "5px" }}>
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

                    // justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      width: "45%",
                    }}
                  >
                    <img
                      src="/images/boys.png"
                      alt="Boy"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#333",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      Boys{" "}
                      <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                        {event.acc_boys_count || "-"}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <img
                      src="/images/girls.png"
                      alt="Girl"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#333",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      Girls{" "}
                      <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                        {event.acc_girls_count || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2  0px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <img
                      src="/images/male.png"
                      alt="Male Faculty"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <div
                      style={{
                        fontSize: "11px", // Set the font size only once
                        color: "#333",
                        display: "flex",
                        flexDirection: "column",
                        width: "auto", // Adjust width as necessary
                        whiteSpace: "nowrap", // Prevent text wrapping
                      }}
                    >
                      Male Faculty{" "}
                      <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                        {event.acc_male_faculty_count || "-"}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <img
                      src="/images/female.png"
                      alt="Female Faculty"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <div
                      style={{
                        fontSize: "11px", // Set the font size only once
                        color: "#333",
                        display: "flex",
                        flexDirection: "column",
                        width: "auto", // Adjust width as necessary
                        whiteSpace: "nowrap", // Prevent text wrapping
                      }}
                    >
                      Female Faculty{" "}
                      <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                        {event.acc_female_faculty_count || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ color: "#4b91f1", marginBottom: "5px" }}>
              <p style={{ margin: 0, color: "#4b91f1" }}>Hostel Manager :</p>
              <p style={{ margin: "5px 0" }}>Dr. Gautham</p>
              <p style={{ margin: 0 }}>📞 9587643455</p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
                marginBottom: "0px",
              }}
            >
              <AssignButton
                key={item.id}
                adminasign={adminasign}
                item={item.id}
                isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
              />{" "}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
    } else {
      // if (item.id === "Venue") {
      // setrecontent(<>car</>)
      setSelectedItem(item);
      console.log("car", selectedItem);

      setrepopup(true);
      // }
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent:
            ShowPencil || !isSidePanelOpen ? "center" : "flex-start",
        }}
      >
        <div className="tree">
          {treeRendering(
            treeData,
            handleBoxClick,
            colorMap,
            changeborder,
            progressMap,
            ShowPencil
          )}
          <div className="relative">
            <p style={{ marginBottom: "10px", paddingLeft: "6%" }}>
              special requests
            </p>
            <SpecialRequest />
          </div>
        </div>

        {isSidePanelOpen && !ShowPencil && (
          <div
            style={{
              width: "16%",
              // maxHeight: "55%",
              border: "2px dashed #d3d3d3",
              // height: "100%",
              marginTop: "2.5%",
              borderRadius: "11px",
              overflowY: "scroll", // Keep this to allow scrolling without showing the scrollbar
              position: "absolute",
              top: "23%",
              right: "3%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // Internet Explorer 10+
            }}
          >
            <style>
              {`
             /* Hide scrollbar for Chrome, Safari and Opera */
             div::-webkit-scrollbar {
               display: none;
             }
           `}
            </style>

            {sidePanelContent}
          </div>
        )}

        {repopup && (
          // <div
          //   style={{
          //     width: "16%",
          //     // maxHeight: "55%",
          //     border: "2px dashed #d3d3d3",
          //     // height: "100%",
          //     marginTop: "2.5%",
          //     borderRadius: "11px",
          //     overflowY: "scroll", // Keep this to allow scrolling without showing the scrollbar
          //     position: "absolute",
          //     top: "23%",
          //     right: "3%",
          //     display: "flex",
          //     alignItems: "center",
          //     flexDirection: "column",
          //     scrollbarWidth: "none", // Firefox
          //     msOverflowStyle: "none", // Internet Explorer 10+
          //   }}
          // >
          //   <style>
          //     {`
          //    /* Hide scrollbar for Chrome, Safari and Opera */
          //    div::-webkit-scrollbar {
          //      display: none;
          //    }
          //  `}
          //   </style>

          //   {recontent}
          // </div>
          <Popup closePopup={closePopup} selectedItem={selectedItem} />
        )}
      </div>

      <div className="confirmsubmit">
        {user === "eventmanager" ? (
          <Link to={"/"}>
            <button type="button">Go Back</button>
          </Link>
        ) : (
          <button type="submit" onClick={handleReRequestClick}>
            Re-request
          </button>
        )}

        <Link to={"/"}>
          <button
            type="submit"
            // onClick={confirm}
          >
            Confirm
          </button>
        </Link>
      </div>
    </>
  );
};

const darkenColor = (color, amount) => {
  let usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  let b = ((num >> 8) & 0x00ff) + amount;
  let g = (num & 0x0000ff) + amount;

  r = r > 255 ? 255 : r < 0 ? 0 : r;
  b = b > 255 ? 255 : b < 0 ? 0 : b;
  g = g > 255 ? 255 : g < 0 ? 0 : g;

  return (
    (usePound ? "#" : "") +
    (g | (b << 8) | (r << 16)).toString(16).padStart(6, "0")
  );
};

const treeRendering = (
  treeData,
  handleBoxClick,
  colorMap,
  changeborder,
  progressMap,
  ShowPencil
) => {
  return (
    <ul>
      {treeData.map((item) => {
        // Determine if the node should be clickable based on its color
        const isClickable = colorMap[item.id] !== "#d3d3d3";

        return (
          <li key={item.id} className={`${item.text} ${item.id}`}>
            <div
              className="logoimage"
              onClick={() => isClickable && handleBoxClick(item)}
              style={{
                cursor: isClickable ? "pointer" : "not-allowed",
              }}
            >
              <div
                className="formbox"
                style={{
                  border:
                    item.id !== "Invitees"
                      ? `2.5px solid ${darkenColor(
                          colorMap[item.id] || "#f77575",
                          -30
                        )}`
                      : "none",

                  backgroundColor:
                    item.id !== "Invitees" ? colorMap[item.id] : "transparent",

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

                {ShowPencil && item.id !== "Invitees" && (
                  <EditIcon
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      zIndex: 2,
                      color: "#333",
                    }}
                  />
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
                  progressMap,
                  ShowPencil // Pass ShowPencil down to child nodes
                )
              : null}
          </li>
        );
      })}
    </ul>
  );
};

export default EventDetailsriser;
