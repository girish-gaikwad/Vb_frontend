import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import account from "./assets/account_circle.png";
import INFRAWORK from "./infra/pages/content/infrawork";
import { useState } from "react";
import EVENTMANAGERWORK from "./Event_manager/pages/content/eventmanagerwork";
import EVENTAPPROVED from "./Event_manager/pages/approvedlist/eventapproved";
// import EventDetails from "./Event_manager/pages/eventdetails/EventDetails";
import EventDetailsriser from "./pages/eventdeatils/eventdetails";
import LiveEvent from "./pages/liveevent/liveEvents";
import SIDEBAR from "./pages/sidebar/sidebar";
import TreeStructure from "./pages/flowchart/flowCharts";
// import person from "  ./Assets/person.png";

function App() {
  const dummyDataI = {
    tomorrow: [
      { id: 1, name: "Mr. Ramesh", contact: "984158991", dateTime: "07-7-2020-08.00 am" },
      { id: 2, name: "Ms. Sita", contact: "984158992", dateTime: "08-7-2020-09.00 am" },
      { id: 3, name: "Mr. Rajesh", contact: "984158993", dateTime: "08-7-2020-10.00 am" },
    ],
    oneDayAgo: [
      { id: 4, name: "Mr. Kumar", contact: "984158993", dateTime: "06-7-2020-10.00 am" },
      { id: 5, name: "Ms. Anu", contact: "984158994", dateTime: "06-7-2020-11.00 am" },
    ],
  };
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store selected event data
  const [selectedEventriser, setSelectedEventriser] = useState(null); // State to store selected event data

  const dummyData = 
        [

          { id: 1, name: "Mr. Ramesh", contact: "984158991", startdateTime: "07-7-2020-08.00 am", enddateTime: "07-7-2020-08.00 am", status: 0 },
          { id: 2, name: "Ms. Sita", contact: "984158992", startdateTime: "07-7-2020-08.00 am", enddateTime: "07-7-2020-08.00 am", status: 0 },
          { id: 3, name: "Mr. Rajesh", contact: "984158993", startdateTime: "07-7-2020-08.00 am", enddateTime: "07-7-2020-08.00 am", status: 0 },
        
          { id: 4, name: "Mr. Kumar", contact: "984158993", startdateTime: "07-7-2020-08.00 am", enddateTime: "07-7-2020-08.00 am", status: 0 },
          { id: 5, name: "Ms. Anu", contact: "984158994", startdateTime: "07-7-2020-08.00 am", enddateTime: "07-7-2020-08.00 am", status: 0 },
        ]
        
      ;

const user = "eventmanger";

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
      <Route path="/" element={<LiveEvent setSelectedEvent={setSelectedEventriser}/>} />
      <Route path="/tree" element={<TreeStructure />}  />

      <Route path="/infra" element={<INFRAWORK approvedEvents={approvedEvents} setApprovedEvents={setApprovedEvents} dummyData={dummyDataI} />} />
      <Route path="/pending" element={<EVENTMANAGERWORK approvedEvents={approvedEvents} setApprovedEvents={setApprovedEvents} dummyData={dummyData} setSelectedEvent={setSelectedEvent} />} />
            <Route path="/approved" element={<EVENTAPPROVED approvedEvents={approvedEvents} />} />
            {/* <Route path="/admin-approval/:id" element={<EventDetails selectedEvent={selectedEvent} />} />  */}
            <Route path="/registered-event/:id" element={<EventDetailsriser selectedEvent={selectedEventriser} user={user} />} /> 
      </Routes>

      </  div>
    </div>
    </div>
    </div>
      </Router>
</div>
  );
}

export default App;
