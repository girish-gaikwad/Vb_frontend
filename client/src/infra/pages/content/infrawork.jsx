import React, { useState } from "react";
import "./infrawork.css";
import { CiSquareMore } from "react-icons/ci";
import Divider from "@mui/material/Divider";
import { IoSendSharp } from "react-icons/io5";
import suit from "/img/suit.png";
import money from "/img/money.png";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Precomputed image selection function
const getRandomImage = () => {
  const images = [suit, money];
  return images[Math.floor(Math.random() * images.length)];
};

// Add random images to dummyData
const addRandomImagesToEvents = (data) => {
  return {
    tomorrow: data.tomorrow.map(event => ({
      ...event,
      image: getRandomImage()
    })),
    oneDayAgo: data.oneDayAgo.map(event => ({
      ...event,
      image: getRandomImage()
    }))
  };
};

function INFRAWORK({ approvedEvents, setApprovedEvents, dummyData }) {
  const [events, setEvents] = useState(() => addRandomImagesToEvents(dummyData));

  const handleButtonClick = (eventId, buttonIndex) => {
    const updatedEvents = { ...events };

    for (const list in updatedEvents) {
      updatedEvents[list] = updatedEvents[list].map((event) => {
        if (event.id === eventId) {
          event[`button${buttonIndex}Clicked`] = true;

          if (buttonIndex === 1) {
            toast(`Event Requirements are assigned to event raised by ${event.name}`);
          }
          if (buttonIndex === 2) {
            toast(`Handler is assigned to event's requirements raised by ${event.name}`);
          }
          if (buttonIndex === 3) {
            toast(`Venue is assigned to event raised by ${event.name}`);
          }

          if (event.button1Clicked && event.button2Clicked && event.button3Clicked) {
            setApprovedEvents((prev) => [...prev, event]);
            return null;
          }
        }
        return event;
      }).filter(Boolean);
    }

    setEvents(updatedEvents);
  };

  return (
        
          <>
          
      <ToastContainer />
          <div className="infrawork-static-details"  style={{width:"98%"}}>
            <div className="infrawork-header" style={{display:"flex",width:"100%"}}>
              {" "}
              Pending List{" "}
              <div>
                <CiSquareMore style={{ height: "30px", width: "30px" }} />
              </div>
            </div>

            <div className="infrawork-labels">
              <p>Faculty</p>
              <p>Start</p>
              <p>Venue Requirement </p>
              <p>Handled by</p>
              <p>Venue</p>
            </div>
            <Divider variant="middle" component="p" />
          </div>
          <div className="infrawork-scroll-events">
            <div className="infrawork-tomorrow">
              <div className="infrawork-label-x"> Tomorrow</div>
              <div className="infrawork-tomorrow-content">
                {events.tomorrow.map((event) => (
                  <div className="infrawork-events" key={event.id}>
                    <div className="infrawork-a">
                      <div className="infrawork-random-img">
                        <img src={event.image} style={{ width: "100%", height: "100%" }} alt="random" />
                      </div>
                    </div>
                    <div className="infrawork-a">
                      <div>{event.name}</div>
                      <h4>{event.contact}</h4>
                    </div>
                    <div className="infrawork-a infrawork-d">
                      {event.dateTime}
                    </div>
                    <div className="infrawork-a">
                      <div className="infrawork-dropdown-container">
                        <select className="infrawork-dropdown">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                        <div className="infrawork-button-with-icon" onClick={() => handleButtonClick(event.id, 1)}>
                          <i className="icon">
                            <IoSendSharp size={20} />
                          </i>
                        </div>
                      </div>
                    </div>
                    <div className="infrawork-a">
                      <div className="infrawork-dropdown-container">
                        <select className="infrawork-dropdown">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                        <div className="infrawork-button-with-icon" onClick={() => handleButtonClick(event.id, 2)}>
                          <i className="icon">
                            <IoSendSharp size={20} />
                          </i>
                        </div>
                      </div>
                    </div>
                    <div className="infrawork-a">
                      <div className="infrawork-dropdown-container">
                        <select className="infrawork-dropdown">
                          <option value="option1">Classroom  </option>
                        </select>
                        <div className="infrawork-button-with-icon" onClick={() => handleButtonClick(event.id, 3)}>
                          <i className="icon">
                            <IoSendSharp size={20} />
                          </i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="infrawork-onedayago">
              <div className="infrawork-label-x"> 1 day ago</div>
              <div className="infrawork-tomorrow-content">
                {events.oneDayAgo.map((event) => (
                  <div className="infrawork-events" key={event.id}>
                    <div className="infrawork-a">
                      <div className="infrawork-random-img">
                        <img src={event.image} style={{ width: "100%", height: "100%" }} alt="random" />
                      </div>
                    </div>
                    <div className="infrawork-a">
                      <div>{event.name}</div>
                      <h4>{event.contact}</h4>
                    </div>
                    <div className="infrawork-a infrawork-d">
                      {event.dateTime}
                    </div>
                    <div className="infrawork-a">
                      <div className="infrawork-dropdown-container">
                        <select className="infrawork-dropdown">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                        <div className="infrawork-button-with-icon" onClick={() => handleButtonClick(event.id, 1)}>
                          <i className="icon">
                            <IoSendSharp size={20} />
                          </i>
                        </div>
                      </div>
                    </div>
                    <div className="infrawork-a">
                      <div className="infrawork-dropdown-container">
                        <select className="infrawork-dropdown">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                        <div className="infrawork-button-with-icon" onClick={() => handleButtonClick(event.id, 2)}>
                          <i className="icon">
                            <IoSendSharp size={20} />
                          </i>
                        </div>
                      </div>
                    </div>
                    <div className="infrawork-a">
                      <div className="infrawork-dropdown-container">
                        <select className="infrawork-dropdown">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                        <div className="infrawork-button-with-icon" onClick={() => handleButtonClick(event.id, 3)}>
                          <i className="icon">
                            <IoSendSharp size={20} />
                          </i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </>
        
  );
}

export default INFRAWORK;

















// import React from 'react'
// import "./sidebar.css"
// import Eventlogo from "../../Assets/EventLogo.png";
// import createventlogo from "../../Assets/createventlogo.png";
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

// function SIDEBAR() {
//   return (<>
  
// {/* <div className="sidebar">
//           <div className="websitename">
//             <div className="tags">
//               <img src={Eventlogo} alt="Website Logo" />
//               <p>Event</p>
//             </div>
//           </div>

//           <div className="currentpage">
//             <div className="tags">
//               <img src={createventlogo} alt="Create Event" />
//               <p>Create Event</p>
//             </div>
//           </div>
//         </div> */}

// <div className="sidebar">
// <Router>
      
//       <ul>
//         <li>
//           <NavLink 
//           style={{width:"100%",padding:"8px"}}
//             className={({ isActive }) => isActive ? "active" : "inactive" }
//           >
//             <img src="images/logo.png" alt="Event Logo" />
//             <p className='link-text' >
//               EVENT MANAGER
//             </p>
//           </NavLink>
//         </li>


//         <li>
//           <NavLink 
//             to="/pending"
//             className={({ isActive }) => isActive ? "active" : "inactive"}
//           >
//             <img src="images/pending.png" alt="Pending Icon" />
//             <p className='link-text'>
//               Pending
//             </p>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink 
//             to="/approved"
//             className={({ isActive }) => isActive ? "active" : "inactive"}
//           >
//             <img src="images/approval.png" alt="Approved Icon" />
//             <p className='link-text'>
//               Approved
//             </p>
//           </NavLink>
//         </li>
//       </ul>
//     </Router>
//     </div>

    
//     </>

//   )
// }

// export default SIDEBAR