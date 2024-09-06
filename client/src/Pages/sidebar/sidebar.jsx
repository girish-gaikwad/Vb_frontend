import React from "react";
import "./sidebar.css";
import Eventlogo from "../../assets/EventLogo.png";
import createventlogo from "../../assets/createventlogo.png";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

function SIDEBAR({ user }) {
  // Destructuring 'user' from props
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink
            style={{
              width: "100%",
              padding: "8px",
              display: "flex",
              justifyContent: "center",
            }}
            className="active"
          >
            <img src={Eventlogo} alt="Event Logo" />
            <p className="link-text">Event manager</p>
          </NavLink>
        </li>

        {user === "user" && (
          <li>
            <NavLink
              to="/"
              style={{ width: "80%" }}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <div>
                <img src={createventlogo} alt="Create Event Icon" />
              </div>
              <p className="link-text" style={{ fontSize: "16px" }}>
                Create Event
              </p>
            </NavLink>
          </li>
        )}

        {user === "eventmanager" && (
          <>
            <li>
              <NavLink
                to="/pending"
                style={{ width: "80%" }}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <div>
                  <img src={createventlogo} alt="Pending Icon" />
                </div>
                <p className="link-text" style={{ fontSize: "16px" }}>
                  Pending
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/approved"
                style={{ width: "80%" }}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <div>
                  <img src={createventlogo} alt="Approved Icon" />
                </div>
                <p className="link-text" style={{ fontSize: "16px" }}>
                  Approved
                </p>
              </NavLink>
            </li>
          </>
        )}

        {user === "hostelmanager" && (
          <>
            <li>
              <NavLink
                to="/pending"
                style={{ width: "80%" }}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <div>
                  <img src={createventlogo} alt="Pending Icon" />
                </div>
                <p className="link-text" style={{ fontSize: "16px" }}>
                  Pending
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/approved"
                style={{ width: "80%" }}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <div>
                  <img src={createventlogo} alt="Approved Icon" />
                </div>
                <p className="link-text" style={{ fontSize: "16px" }}>
                  Approved
                </p>
              </NavLink>
            </li>
          </>
        )}

        {user === "transportmanager" && (
          <>
            <li>
              <NavLink
                to="/pending"
                style={{ width: "80%" }}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <div>
                  <img src={createventlogo} alt="Pending Icon" />
                </div>
                <p className="link-text" style={{ fontSize: "16px" }}>
                  Pending
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/approved"
                style={{ width: "80%" }}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <div>
                  <img src={createventlogo} alt="Approved Icon" />
                </div>
                <p className="link-text" style={{ fontSize: "16px" }}>
                  Approved
                </p>
              </NavLink>
            </li>
          </>
        )}

        {user === "infra" && (
          <>
            <li>
              <NavLink
                to="/pending"
                style={{ width: "80%" }}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <div>
                  <img src={createventlogo} alt="Pending Icon" />
                </div>
                <p className="link-text" style={{ fontSize: "16px" }}>
                  Pending
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/approved"
                style={{ width: "80%" }}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <div>
                  <img src={createventlogo} alt="Approved Icon" />
                </div>
                <p className="link-text" style={{ fontSize: "16px" }}>
                  Approved
                </p>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
export default SIDEBAR;
