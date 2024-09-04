import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LiveEvent from "./Pages/liveevent/liveEvents";
import SIDEBAR from "./Pages/sidebar/sidebar";
import account from "./Assets/account_circle.png";
import TreeStructure from "./Pages/flowchart/flowCharts";
import INFRAWORK from "./infra/pages/content/infrawork";
import { useState } from "react";
import EVENTMANAGERWORK from "./Event_manager/pages/content/eventmanagerwork";
import EVENTAPPROVED from "./Event_manager/pages/approvedlist/eventapproved";
import EventDetails from "./Event_manager/pages/eventdetails/EventDetails";
import EventDetailsriser from "./Pages/eventdeatils/eventdetails";
// import person from "  ./Assets/person.png";

function App() {
  
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store selected event data
  const [selectedEventriser, setSelectedEventriser] = useState(null); // State to store selected event data

 

  const user = "eventmanager";
  // const user = "user";

  return (
    <div className="box">
      <Router>
        <SIDEBAR user={user} />

        <div className="rightwindow">
          <div className="wcover">
            <div className="bell">
              <div className="circle">
                <img src={account} alt="Account" className="accimgx" />
              </div>
            </div>
            <div className="support">
              <div className="change">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <LiveEvent setSelectedEvent={setSelectedEventriser} />
                    }
                  />
                  <Route path="/tree" element={<TreeStructure />} />


{/* 
                  <Route
                    path="/infra"
                    element={
                      <INFRAWORK
                        approvedEvents={approvedEvents}
                        setApprovedEvents={setApprovedEvents}
                      />
                    }
                  /> */}


                  <Route
                    path="/pending"
                    element={
                      <EVENTMANAGERWORK
                        approvedEvents={approvedEvents}
                        setApprovedEvents={setApprovedEvents}
                        setSelectedEvent={setSelectedEvent}
                      />
                    }
                  />
                  <Route
                    path="/approved"
                    element={<EVENTAPPROVED approvedEvents={approvedEvents} />}
                  />
                  <Route
                    path="/event/:id"
                    element={<EventDetails selectedEvent={selectedEvent} />}
                  />
                  {/* <Route path="/eventriser/:id" element={<EventDetailsriser selectedEvent={selectedEventriser} />} />  */}

                  <Route
                    path="/registered-event/:id"
                    element={
                      <EventDetailsriser
                        selectedEvent={selectedEventriser}
                        user={user}
                      />
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
