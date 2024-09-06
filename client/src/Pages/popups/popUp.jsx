import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./popUps.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Input } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Slider,
  Button,
  Checkbox,
  Typography,
  Tooltip,
  TextField,
  FormControlLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  ToggleButtonGroup,
  ToggleButton,
  InputLabel,
  Select,
  Chip,
  FormHelperText,
} from "@mui/material";

import {
  Card,
  Box,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  InputAdornment,
  MenuItem,
  DialogActions,
  styled,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
import { BsFillPeopleFill } from "react-icons/bs";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { IoPerson, IoPersonAddOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  ArrowBack,
  ArrowForward,
  CalendarToday,
  GroupAdd,
  GroupRemove,
  LocationOn,
  PersonAdd,
  PersonOutline,
  Undo,
} from "@mui/icons-material";

const CardStack = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  width: "100%",
  "& > div": {
    position: "absolute",
    transition: "transform 0.3s ease",
  },
});

const ListItem = React.memo(
  ({
    item,
    onPrev,
    onNext,
    onAdd,
    onDelete,
    onInputChange,
    handleChangeColor,
    handleClose,
    errors,
  }) => {
    return (
      <Card
        sx={{
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "50px",
          paddingBottom: "20px",
          maxWidth: "800px",
          // height: "600px",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            left: "66%",
            top: "1%",
            padding: "0 10px",
          }}
        >
          <FormLabel sx={{ flexShrink: 0, width: "90px" }}>
            Guest Count
          </FormLabel>
          <p style={{ margin: "0 20px" }}> {item.id}</p>
          <IoPersonAddOutline
            onClick={onAdd}
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          />
          <HiOutlineXMark
            onClick={onDelete}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <FormLabel>Salutation</FormLabel>
              <TextField
                placeholder="Eg: Mr"
                variant="outlined"
                value={item.salutation}
                onChange={(e) => onInputChange("salutation", e.target.value)}
                error={!!errors.salutation} // Shows error state if there's an error
                helperText={errors.salutation} // Displays error message
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <FormLabel>First Name</FormLabel>
              <TextField
                placeholder="Eg: RIYA"
                variant="outlined"
                value={item.first_name}
                onChange={(e) => onInputChange("first_name", e.target.value)}
                error={!!errors.first_name}
                helperText={errors.first_name}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <FormLabel>Last Name</FormLabel>
              <TextField
                placeholder="Eg: K"
                variant="outlined"
                value={item.last_name}
                onChange={(e) => onInputChange("last_name", e.target.value)}
                error={!!errors.last_name}
                helperText={errors.last_name}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={12}>
            <FormControl
              component="fieldset"
              fullWidth
              error={!!errors.gender} // Highlight the field in red if there's an error
            >
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={item.gender}
                onChange={(e) => onInputChange("gender", e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="others"
                  control={<Radio />}
                  label="Others"
                />
              </RadioGroup>
              {/* Display the error message below the RadioGroup */}
              <FormHelperText>{errors.gender}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <FormLabel>Designation</FormLabel>
              <TextField
                select
                variant="outlined"
                value={item.designation}
                onChange={(e) => onInputChange("designation", e.target.value)}
                error={!!errors.designation}
                helperText={errors.designation}
              >
                <MenuItem value="software-developer">
                  Software Developer
                </MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="designer">Designer</MenuItem>
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <FormLabel>Organization</FormLabel>
              <TextField
                placeholder="Eg: KTC Private Limited"
                variant="outlined"
                value={item.organization}
                onChange={(e) => onInputChange("organization", e.target.value)}
                error={!!errors.organization}
                helperText={errors.organization}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={12}>
            <FormControl fullWidth>
              <FormLabel>Email</FormLabel>
              <TextField
                placeholder="Eg: John@gmail.com"
                variant="outlined"
                value={item.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2.2}>
            <FormControl fullWidth>
              <FormLabel>Country Code</FormLabel>
              <TextField
                placeholder="Eg: +91"
                variant="outlined"
                value={item.country_code}
                onChange={(e) => onInputChange("country_code", e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <FormLabel>Phone Number</FormLabel>
              <TextField
                placeholder="Eg: 9866587745"
                variant="outlined"
                value={item.phone_number}
                onChange={(e) => onInputChange("phone_number", e.target.value)}
                error={!!errors.phone_number}
                helperText={errors.phone_number}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <DialogActions>
            <div className="cardsarrow" onClick={onPrev}>
              <IoIosArrowBack />
            </div>
            <div className="cardsarrow" onClick={onNext}>
              <IoIosArrowForward />
            </div>
            <button onClick={handleChangeColor} color="primary">
              Save
            </button>
            <button onClick={handleClose} color="primary">
              Cancel
            </button>
          </DialogActions>
        </Box>
      </Card>
    );
  }
);

const findPair = (number, pairs) => {
  for (const pair of pairs) {
    if (pair.includes(number)) {
      const index = pair.indexOf(number);
      const pairedNumber = pair[1 - index];
      if (number == pair[1]) {
        return pair[0];
      } else {
        return pair[1];
      }
    }
  }
  // console.log(`Number ${number} is not in any pair.`);
};

const findGroupMembers = (number, pairs) => {
  for (const group of pairs) {
    if (group.includes(number)) {
      // Return the group excluding the specified number
      return group.filter((id) => id !== number);
    }
  }
  return []; // Return an empty array if the number is not found in any group
};

const ListItemA = React.memo(
  ({
    cardno,
    item,
    onPrev,
    onNext,
    onInputChange,
    handleClose,
    groups,
    initialGuests,
    minDate,
    errors,
  }) => {
    const pairedman = findPair(cardno + 1, groups);
    // console.log(groups)
    return (
      <Card
        sx={{
          paddingLeft: "20px",
          paddingRight: "20px",
          // paddingTop: "50px",
          // paddingBottom: "30px",
          // maxWidth: "800px",
          // height: "370px",
          boxShadow: 3,
          borderRadius: 2,
          // border: "solid black",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <div
            className="options"
            style={{ marginRight: "5px", marginTop: "5px" }}
          >
            {cardno + 1}
          </div>

          {pairedman && (
            <div
              className="options"
              style={{ marginRight: "5px", marginTop: "5px" }}
            >
              {pairedman}
            </div>
          )}
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12}>
            <FormLabel>Arrival Time</FormLabel>

            <input
              style={{
                width: "87%",
                border: "solid 1px #E8E8E8",
                fontSize: "16px",
                borderRadius: "6px",
                padding: "20px",
              }}
              placeholder="Select Date and Time"
              type="datetime-local"
              id="start_at"
              name="start_at"
              value={item.arrival_at}
              onChange={(e) => onInputChange("arrival_at", e.target.value)}
              error={!!errors.arrival_at}
              helperText={errors.arrival_at}
              min={minDate}
            />
            {!!errors.arrival_at && (
              <div style={{ color: "red", fontSize: "10px" }}>
                {errors.arrival_at}
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <FormLabel>Departure Time</FormLabel>

            <input
              style={{
                width: "87%",
                border: "solid 1px #E8E8E8",
                fontSize: "16px",
                borderRadius: "6px",
                padding: "20px",
              }}
              placeholder="Select Date and Time"
              type="datetime-local"
              id="start_at"
              name="start_at"
              value={item.departure_at}
              onChange={(e) => onInputChange("departure_at", e.target.value)}
              min={minDate}
            />
            {!!errors.departure_at && (
              <div style={{ color: "red", fontSize: "10px" }}>
                {errors.departure_at}
              </div>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={12}>
            <FormControl style={{ width: "97%" }}>
              <FormLabel>Accommodation Venue</FormLabel>
              <TextField
                select
                variant="outlined"
                value={item.accommodation_venue}
                onChange={(e) =>
                  onInputChange("accommodation_venue", e.target.value)
                }
                error={!!errors.accommodation_venue} // Conditionally set the error state
                helperText={errors.accommodation_venue} // Display the error message
              >
                <MenuItem value="Guest House">Guest House</MenuItem>
                <MenuItem value="hostel">Hostel</MenuItem>
                <MenuItem value="room">Room</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <DialogActions>
            <div className="cardsarrow" onClick={onPrev}>
              <IoIosArrowBack />
            </div>

            {/* <Button style={{height:"35px", color:"white"}} >save</Button> */}

            <div className="cardsarrow" onClick={onNext}>
              <IoIosArrowForward />
            </div>
          </DialogActions>
        </Box>
      </Card>
    );
  }
);
const ListItemT = React.memo(
  ({
    cardno,
    item,
    onPrev,
    onNext,
    onInputChange,
    tripType,
    handleClose,
    groups,
    initialGuests,
    minDate,
    errors,
  }) => {
    const [tripTypeState, setTripType] = useState(tripType?.toLowerCase()); // Default to "both" if tripType is undefined

    const handleTripTypeChange = (event, newTripType) => {
      if (newTripType !== null) {
        const normalizedTripType = newTripType.toLowerCase();
        setTripType(normalizedTripType);
        onInputChange(item.id, "travel_type", normalizedTripType); // Update the travel_type in the cards state
      }
    };

    // Both fields are enabled when tripTypeState is 'both'
    const isLeftEnabled =
      tripTypeState === "both" || tripTypeState === "onward";
    const isRightEnabled =
      tripTypeState === "both" || tripTypeState === "return";

    const pairedman = findGroupMembers(cardno + 1, groups);
    return (
      <Card
        sx={{
          paddingLeft: "20px",
          paddingRight: "20px",
          // paddingTop: "50px",
          // maxWidth: "800px",
          // height: "350px",
          boxShadow: 3,
          borderRadius: 2,
          // border: "solid black",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <div
            className="options"
            style={{ marginRight: "5px", marginTop: "5px" }}
          >
            {cardno + 1}
          </div>

          {pairedman.map((memberId, index) => (
            <div
              key={index}
              className="options"
              style={{ marginRight: "5px", marginTop: "5px" }}
            >
              {memberId}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ width: "60%", marginRight: "5px" }}>
            <ToggleButtonGroup
              value={tripType}
              exclusive
              onChange={handleTripTypeChange}
              aria-label="trip type"
              style={{ marginBottom: "20px" }}
              fullWidth
            >
              <ToggleButton value="Both">Both</ToggleButton>
              <ToggleButton value="Onward">Onward</ToggleButton>
              <ToggleButton value="Return">Return</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <FormControl style={{ width: "25%", height: "20px" }}>
            <TextField
              select
              variant="outlined"
              value={item.vehicle_type} // Set the current value
              onChange={(e) =>
                onInputChange(item.id, "vehicle_type", e.target.value)
              }
              error={!!errors.vehicle_type} // Conditionally set the error state
              helperText={errors.vehicle_type} // Display the error message
            >
              <MenuItem value="Bolero">Bolero</MenuItem>
              <MenuItem value="Innova">Innova</MenuItem>
              <MenuItem value="Swift">Swift</MenuItem>
              <MenuItem value="Scorpio">Scorpio</MenuItem>
            </TextField>
          </FormControl>
        </div>

        <Grid container spacing={2} alignItems="center">
          {/* Left Side Input Fields */}
          <Grid item xs={6}>
            <input
              style={{
                width: "87%",
                border: "solid 1px #E8E8E8",
                fontSize: "16px",
                borderRadius: "6px",
                padding: "20px",
              }}
              placeholder="Select Date and Time"
              type="datetime-local"
              id="start_at"
              name="start_at"
              disabled={!isLeftEnabled}
              value={item.t_arrival_at}
              onChange={(e) =>
                onInputChange(item.id, "t_arrival_at", e.target.value)
              }
              min={minDate}
            />
            {!!errors.t_arrival_at && (
              <div style={{ color: "red", fontSize: "10px" }}>
                {errors.t_arrival_at}
              </div>
            )}

            <TextField
              label="Location"
              fullWidth
              disabled={!isLeftEnabled}
              value={item.from_place}
              onChange={(e) =>
                onInputChange(item.id, "from_place", e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <div>
                    <LocationOn />
                  </div>
                ),
              }}
              style={{ marginTop: "10px" }}
              error={!!errors.from_place}
              helperText={errors.from_place}
            />

            <TextField
              label="Location"
              fullWidth
              disabled={!isLeftEnabled}
              value={item.to_place}
              onChange={(e) =>
                onInputChange(item.id, "to_place", e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <div>
                    <LocationOn />
                  </div>
                ),
              }}
              style={{ marginTop: "10px" }}
              error={!!errors.to_place}
              helperText={errors.to_place}
            />
          </Grid>

          {/* Right Side Input Fields */}
          <Grid item xs={6}>
            <input
              style={{
                width: "87%",
                border: "solid 1px #E8E8E8",
                fontSize: "16px",
                borderRadius: "6px",
                padding: "20px",
              }}
              placeholder="Select Date and Time"
              type="datetime-local"
              id="start_at"
              name="start_at"
              disabled={!isRightEnabled}
              value={item.t_depature_at}
              onChange={(e) =>
                onInputChange(item.id, "t_depature_at", e.target.value)
              }
              min={minDate}
            />

            {!!errors.t_depature_at && (
              <div style={{ color: "red", fontSize: "10px" }}>
                {errors.t_depature_at}
              </div>
            )}
            <TextField
              label="Location"
              fullWidth
              disabled={!isRightEnabled}
              value={item.r_from_plcae}
              onChange={(e) =>
                onInputChange(item.id, "r_from_plcae", e.target.value)
              }
              min={minDate}
              InputProps={{
                endAdornment: (
                  <div>
                    <LocationOn />
                  </div>
                ),
              }}
              style={{ marginTop: "10px" }}
              error={!!errors.r_from_plcae}
              helperText={errors.r_from_plcae}
            />
            <TextField
              label="Location"
              fullWidth
              disabled={!isRightEnabled}
              value={item.r_to_plcae}
              onChange={(e) =>
                onInputChange(item.id, "r_to_plcae", e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <div>
                    <LocationOn />
                  </div>
                ),
              }}
              style={{ marginTop: "10px" }}
              error={!!errors.r_to_plcae}
              helperText={errors.r_to_plcae}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <DialogActions>
            <div className="cardsarrow" onClick={onPrev}>
              <IoIosArrowBack />
            </div>

            <Button style={{ height: "35px", color: "white" }}>save</Button>

            <div className="cardsarrow" onClick={onNext}>
              <IoIosArrowForward />
            </div>
          </DialogActions>
        </Box>
      </Card>
    );
  }
);
const maxVisibleSteps = 3;

const EventPopup = ({ onClose, onSave, formData, setFormData }) => {
  const [minDate, setMinDate] = useState("");
  const [errors, setErrors] = useState({});
  const [initialFormData, setInitialFormData] = useState({});
  useEffect(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const formattedDate = now.toISOString().slice(0, 16);
    setMinDate(formattedDate);
  }, []);

  useEffect(() => {
    // Store the initial form data when the popup is opened
    setInitialFormData(formData);
  }, []);

  const handleCancel = () => {
    // Reset form data to the initial state when cancel is clicked
    setFormData(initialFormData);
    onClose();
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.event_name) newErrors.event_name = "Event name is required";
    if (!formData.start_at) newErrors.start_at = "Start time is required";
    if (!formData.end_at) newErrors.end_at = "End time is required";
    if (!formData.assigned_to)
      newErrors.assigned_to = "Assigned to is required";
    if (!formData.event_type) newErrors.event_type = "Event type is required";

    if (formData.start_at && formData.end_at) {
      const start = new Date(formData.start_at);
      const end = new Date(formData.end_at);

      if (start >= end) {
        newErrors.start_at = "Start time and end time must not be same!";
      } else if ((end - start) / (1000 * 60 * 60) < 10) {
        newErrors.start_at =
          "difference between start and end time must be at least 10 hrs!";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave();
      onClose();
    }
  };

  const eventTypes = [
    { id: 1, label: "Seminar" },
    { id: 2, label: "Webinar" },
    { id: 3, label: "Conference" },
    { id: 4, label: "College visit" },
    { id: 5, label: "Symposium" },
    { id: 6, label: "Meetings" },
    { id: 7, label: "Guest Lectures" },
    { id: 8, label: "Others" },
  ];

  return (
    <div className="popup-overlay">
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "40%", height: "auto" }}
      >
        <h2>Register an Event</h2>
        <form className="event-form">
          <label htmlFor="event_name">Name of the event</label>
          <input
            id="event_name"
            name="event_name"
            type="text"
            value={formData.event_name}
            onChange={handleChange}
            placeholder="Event Name"
          />
          {errors.event_name && (
            <span style={{ color: "red", width: "100%" }}>
              {errors.event_name}
            </span>
          )}

          <div className="datebox">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <label htmlFor="start_at">Start</label>
              <input
                style={{ width: "60%" }}
                placeholder="Select Date and Time"
                type="datetime-local"
                id="start_at"
                name="start_at"
                value={formData.start_at}
                onChange={handleChange}
                min={minDate}
              />
              {errors.start_at && (
                <span style={{ color: "red", width: "100%" }}>
                  {errors.start_at}
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <label htmlFor="end_at">End</label>

              <input
                placeholder="Select Date and Time"
                style={{ width: "60%" }}
                type="datetime-local"
                id="end_at"
                name="end_at"
                value={formData.end_at}
                onChange={handleChange}
                min={minDate}
              />

              {errors.end_at && (
                <span style={{ color: "red", width: "auto" }}>
                  {errors.end_at}
                </span>
              )}
            </div>
          </div>

          <label>Type of Event</label>
          <div className="event-type">
            {eventTypes.map((event) => (
              <React.Fragment key={event.id}>
                <input
                  type="radio"
                  id={event.id}
                  name="event_type"
                  value={event.label}
                  checked={formData.event_type === event.label}
                  onChange={handleChange}
                />
                <label htmlFor={event.id}>{event.label}</label>
              </React.Fragment>
            ))}
          </div>
          {errors.event_type && (
            <span style={{ color: "red", width: "auto" }}>
              {errors.event_type}
            </span>
          )}

          <div>
            <label htmlFor="assigned_to">Assigned To</label>
            <input
              id="assigned_to"
              name="assigned_to"
              type="text"
              value={formData.assigned_to}
              onChange={handleChange}
              placeholder="Team Involved"
            />
            {errors.assigned_to && (
              <span style={{ color: "red", width: "auto" }}>
                {errors.assigned_to}
              </span>
            )}
          </div>
        </form>
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const GuestPopup = ({ onClose, onSave, cards, setCards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const handleAdd = () => {
    const newCard = {
      id: cards.length + 1, // Temporary id assignment
      event_id: 3,
      invitees_id: 1,
      salutation: "",
      first_name: "",
      last_name: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      country_code: "",
      phone_number: "",
      accommodation_venue: "",
      arrival_at: "",
      departure_at: "",
      vehicle_type: "",
      travel_type: "",
      t_arrival_at: "",
      t_depature_at: "",
      from_place: "",
      to_place: "",
      r_from_plcae: "",
      r_to_plcae: "",
      guest_status:0,
      combine_accommodation_status:0,
      combine_transport_status:0
    };
    const newCards = [...cards];
    newCards.splice(currentIndex + 1, 0, newCard);
    // Reassign ids to be sequential
    const updatedCards = newCards.map((card, index) => ({
      ...card,
      id: index + 1,
    }));
    setCards(updatedCards);
  };

  const handleDelete = () => {
    if (cards.length === 1) return; // Prevent deleting the last card
    const newCards = cards.filter((_, index) => index !== currentIndex);
    // Reassign ids to be sequential
    const updatedCards = newCards.map((card, index) => ({
      ...card,
      id: index + 1,
    }));
    setCards(updatedCards);
    setCurrentIndex((prevIndex) =>
      prevIndex >= updatedCards.length ? 0 : prevIndex
    );
  };

  const handleInputChange = (id, field, value) => {
    const newCards = cards.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    );
    setCards(newCards);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" })); // Clear the error for the current field
  };

  const validateFields = () => {
    let validationErrors = [];
    let isValid = true;

    cards.forEach((card, index) => {
      let cardErrors = {};

      if (!card.salutation) cardErrors.salutation = "required";
      if (!card.first_name) cardErrors.first_name = "required";
      if (!card.last_name) cardErrors.last_name = "required";
      if (!card.gender) cardErrors.gender = "required";
      if (!card.designation) cardErrors.designation = "required";
      if (!card.organization) cardErrors.organization = "required";
      if (!card.email) cardErrors.email = "required";
      if (!card.phone_number) cardErrors.phone_number = "required";

      if (Object.keys(cardErrors).length > 0) {
        isValid = false;
      }

      validationErrors[index + 1] = cardErrors;
    });

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      const updatedCards = cards.map((card) => ({
        ...card,
        guest_status: 1, // Set guest_status to 1
      }));
      setCards(updatedCards);
      onSave();
      onClose();
    } else {
      toast.error("Validation failed. Please fill out all required fields.");
    }
  };

  return (
    <div className="popup-overlay">
      <div
        className=""
        style={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "700px",
            height: "500px",
          }}
        >
          <ToastContainer />

          <CardStack>
            {cards.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  transform: `translateX(${
                    (currentIndex - index) * -40
                  }px) scale(${index === currentIndex ? 1 : 0.95})`,
                  zIndex: cards.length - Math.abs(currentIndex - index),
                  opacity: currentIndex === index ? 1 : 0.5,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
              >
                <ListItem
                  item={item}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  handleChangeColor={handleSubmit}
                  handleClose={onClose}
                  onInputChange={(field, value) =>
                    handleInputChange(item.id, field, value)
                  } // Corrected
                  errors={errors[item.id] || {}} // Pass the errors for this specific item
                />
              </Box>
            ))}
          </CardStack>
        </Box>
      </div>
    </div>
  );
};

const ParticipantsPopup = ({
  onClose,
  onSave,
  participantsData,
  setParticipantsData,
}) => {
  const [errors, setErrors] = useState({});
  const [initialFormData, setInitialFormData] = useState({});

  useEffect(() => {
    // Store the initial form data when the popup is opened
    setInitialFormData(participantsData);
  }, []);

  const handleCancel = () => {
    // Reset form data to the initial state when cancel is clicked
    setParticipantsData(initialFormData);
    onClose();
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    // Validate participant counts
    const fieldsToValidate = [
      "internal_count",
      "ex_boys_count",
      "ex_girls_count",
    ];

    fieldsToValidate.forEach((field) => {
      if (participantsData[field] < 10) {
        newErrors[field] = "Participants not less than 10";
        isValid = false;
      } else {
        newErrors[field] = "";
      }
    });

    // Validate accommodation fields if checkbox is checked
    if (participantsData.accommodation_status) {
      ["acc_boys_count", "acc_girls_count"].forEach((field) => {
        if (participantsData[field] < 10) {
          newErrors[field] = "Participants not less than 10";
          isValid = false;
        } else {
          newErrors[field] = "";
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSliderChange = (field) => (event, newValue) => {
    setParticipantsData((prevData) => ({
      ...prevData,
      [field]: Math.max(0, newValue), // Ensure non-negative values
    }));
  };

  const handleInputChange = (field) => (event) => {
    const value = Number(event.target.value);
    setParticipantsData((prevData) => ({
      ...prevData,
      [field]: value < 0 ? 0 : value, // Ensure non-negative values
    }));
  };

  const handleBlur = (field) => () => {
    if (participantsData[field] < 0) {
      setParticipantsData((prevData) => ({
        ...prevData,
        [field]: 0,
      }));
    }
  };

  const handleAccommodationChange = () => {
    setParticipantsData((prevData) => {
      const newAccommodationStatus = !prevData.accommodation_status;
      return {
        ...prevData,
        accommodation_status: newAccommodationStatus,
        acc_boys_count: newAccommodationStatus ? 0 : 0, // Set initial value or reset to 0
        acc_girls_count: newAccommodationStatus ? 0 : 0,
        acc_male_faculty_count: newAccommodationStatus ? 0 : 0,
        acc_female_faculty_count: newAccommodationStatus ? 0 : 0,
      };
    });
  };

  const handleSubmit = () => {
    if (validateFields()) {
      setParticipantsData((prevData) => ({
        ...prevData,
        participants_status: 1, // Update participants_status to 1 on save
      }));
      onSave();
      onClose();
    }
  };

  const renderSlider = (label, field) => (
    <div style={{ marginBottom: "10px" }}>
      <label>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Slider
          value={participantsData[field]}
          onChange={handleSliderChange(field)}
          aria-labelledby={`${label.toLowerCase().replace(/\s/g, "-")}-slider`}
          min={0}
          max={500}
          step={1}
          style={{ flexGrow: 1 }}
          valueLabelDisplay="auto"
        />
        <IconButton
          style={{
            borderRadius: "8px",
            border: "none",
            width: "30px",
            height: "30px",
          }}
          aria-label="decrease"
          onClick={() =>
            setParticipantsData((prevData) => ({
              ...prevData,
              [field]: Math.max(0, prevData[field] - 1),
            }))
          }
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          value={participantsData[field]}
          onChange={handleInputChange(field)}
          onBlur={handleBlur(field)}
          style={{ width: 70 }}
          inputProps={{
            step: 1,
            min: 0,
            type: "number",
            style: { MozAppearance: "textfield" },
          }}
          InputProps={{
            inputProps: { min: 0, style: { MozAppearance: "textfield" } },
            sx: {
              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "&[type=number]": {
                MozAppearance: "textfield",
              },
            },
          }}
        />
        <IconButton
          style={{
            borderRadius: "8px",
            border: "none",
            width: "30px",
            height: "30px",
          }}
          aria-label="increase"
          onClick={() =>
            setParticipantsData((prevData) => ({
              ...prevData,
              [field]: prevData[field] + 1,
            }))
          }
        >
          <AddIcon />
        </IconButton>
      </div>
      {errors[field] && (
        <div style={{ color: "red", fontSize: "12px" }}>{errors[field]}</div>
      )}
    </div>
  );

  const renderCounter = (label, field) => (
    <div
      style={{
        marginBottom: "10px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <label>{label}</label>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <IconButton
          style={{
            borderRadius: "8px",
            border: "none",
            width: "30px",
            height: "30px",
          }}
          aria-label="decrease"
          onClick={() =>
            setParticipantsData((prevData) => ({
              ...prevData,
              [field]: Math.max(0, prevData[field] - 1), // Ensure non-negative values
            }))
          }
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          value={participantsData[field]}
          onChange={handleInputChange(field)}
          onBlur={handleBlur(field)}
          style={{ width: 50, margin: "0 10px" }}
          inputProps={{
            step: 1,
            min: 0,
            type: "number",
            style: { MozAppearance: "textfield" },
          }}
          InputProps={{
            inputProps: { min: 0, style: { MozAppearance: "textfield" } },
            sx: {
              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "&[type=number]": {
                MozAppearance: "textfield",
              },
            },
          }}
        />
        <IconButton
          style={{
            borderRadius: "8px",
            border: "none",
            width: "30px",
            height: "30px",
          }}
          aria-label="increase"
          onClick={() =>
            setParticipantsData((prevData) => ({
              ...prevData,
              [field]: prevData[field] + 1,
            }))
          }
        >
          <AddIcon />
        </IconButton>
      </div>
      {errors[field] && (
        <div style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
          {errors[field]}
        </div>
      )}
    </div>
  );

  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`popup-overlay Card box ${flipped ? "flipped" : ""}`}>
      <div
        className="popup-content card-front"
        style={{ width: "30%" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <h2>Participants Details</h2> */}
        <>
          <Typography variant="h5" gutterBottom>
            Participants Count
          </Typography>
          {renderSlider("Count of Internal Participants", "internal_count")}
          <p style={{ marginBottom: "25px" }}>
            Count of External participations
          </p>
          {renderSlider("Count of External Boys", "ex_boys_count")}
          {renderSlider("Count of External Girls", "ex_girls_count")}
          <div style={{ display: "flex", gap: "10%" }}>
            {renderCounter("Count of Male Faculty", "male_faculty_count")}
            {renderCounter("Count of Female Faculty", "female_faculty_count")}
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={participantsData.accommodation_status}
                onChange={handleAccommodationChange}
                color="primary"
              />
            }
            label="Accommodation for external participants"
            style={{ marginBottom: "10px" }}
          />

          {participantsData.accommodation_status ? (
            <button onClick={handleFlip} className="turn-button-front">
              Turn
            </button>
          ) : (
            <div className="popup-buttons">
              <button onClick={handleSubmit}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </>
      </div>
      <div
        className="popup-content card-back"
        style={{ width: "30%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Accommodation Details</h2>
        <>
          {participantsData.accommodation_status && (
            <>
              {renderSlider("Count of Boys Accommodation", "acc_boys_count")}
              {renderSlider("Count of Girls Accommodation", "acc_girls_count")}
              <div style={{ display: "flex", gap: "10%" }}>
                {renderCounter(
                  "Count of Male Faculty Accommodation",
                  "acc_male_faculty_count"
                )}
                {renderCounter(
                  "Count of Female Faculty Accommodation",
                  "acc_female_faculty_count"
                )}
              </div>
            </>
          )}
          <div
            lassName="popup-buttons"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button onClick={handleFlip} className="turn-button-back">
              Turn
            </button>

            <div>
              <button onClick={handleSubmit}>Save</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

const AccomodationPopup = ({
  onClose,
  onSave,
  cards,
  setCards,
  groups,
  setGroups,
  aloneGuests,
  setAloneGuests,
  setLastAction,
  selectedGuest,
  setSelectedGuest,
  startStep,
  setStartStep,
}) => {
  const initialGuests = [...cards];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };
  const handleInputChange = (id, field, value) => {
    const initialGuests = cards.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    );
    setCards(initialGuests);
  };

  const [guestData, setGuestData] = useState(initialGuests);

  const handlePairing = (guestId, pairedGuestId) => {
    const newGroup = [guestId, pairedGuestId];
    setGroups([...groups, newGroup]);
    setGuestData((prevGuestData) =>
      prevGuestData.filter((g) => !newGroup.includes(g.id))
    );
    setLastAction({ type: "pair", group: newGroup });
    setSelectedGuest(null);
  };

  const handleUndoAlone = (guestId) => {
    setAloneGuests(aloneGuests.filter((id) => id !== guestId));
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      {
        id: guestId,
        name: initialGuests.find((g) => g.id === guestId).first_name,
      },
    ]);
    setLastAction(null);
  };

  const handleStayAlone = (guestId) => {
    setAloneGuests([...aloneGuests, guestId]);
    setGuestData((prevGuestData) =>
      prevGuestData.filter((g) => g.id !== guestId)
    );
    setLastAction({ type: "alone", guestId });
    setSelectedGuest(null);
  };

  const handleSelectGuestForPairing = (guestId) => {
    setSelectedGuest(guestId === selectedGuest ? null : guestId);
  };

  const unpairGroup = (group) => {
    setGroups(groups.filter((g) => g !== group));
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      {
        id: group[0],
        name: initialGuests.find((g) => g.id === group[0]).first_name,
      },
      {
        id: group[1],
        name: initialGuests.find((g) => g.id === group[1]).first_name,
      },
    ]);
    setAloneGuests(
      aloneGuests.filter((id) => id !== group[0] && id !== group[1])
    );
  };

  const getUnpairableGroup = (guestId) => {
    return groups.find((group) => group.includes(guestId)) || [];
  };

  const handleNextx = () => {
    setStartStep((prev) =>
      prev + 1 >= initialGuests.length - (maxVisibleSteps - 1) ? prev : prev + 1
    );
  };

  const handleBack = () => {
    setStartStep((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const formattedDate = now.toISOString().slice(0, 16);
    setMinDate(formattedDate);
  }, []);

  const validateFields = () => {
    let validationErrors = [];
    let isValid = true;

    cards.forEach((card, index) => {
      let cardErrors = {};

      if (!card.arrival_at) cardErrors.arrival_at = "required";
      if (!card.departure_at) cardErrors.departure_at = "required";
      if (!card.accommodation_venue)
        cardErrors.accommodation_venue = "required";

      if (Object.keys(cardErrors).length > 0) {
        isValid = false;
      }

      validationErrors[index + 1] = cardErrors;
    });

    setErrors(validationErrors);
    return isValid;
  };

  const areAllGuestsAssigned = () => {
    const allGuests = cards.map((card) => card.id); // Assuming each card has a unique 'id'

    // Flatten the groups array to get a single list of guest IDs in groups
    const groupGuestIds = groups.flat();

    // Combine group guest IDs with alone guest IDs
    const assignedGuestIds = [...groupGuestIds, ...aloneGuests];

    // Check if every guest ID from cards is in the assignedGuestIds array
    return allGuests.every((guestId) => assignedGuestIds.includes(guestId));
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      toast.error("Validation failed. Please fill out all required fields.");
      return;
    }

    if (!areAllGuestsAssigned()) {
      toast.error(
        "All guests must be assigned to either a group or be marked as alone."
      );
      return;
    }
    const updatedCards = cards.map((card) => ({
      ...card,
      combine_accommodation_status: 1, // Set guest_status to 1
    }));
    setCards(updatedCards);
    onSave();
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div
        className="popup-content accomodation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div
          style={{
            border: "solid green",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
        <Box sx={{ width: "100%" }}>
          <ToastContainer />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // alignItems:"center",
              marginBottom: "20px",
              height: "180px",
            }}
          >
            <div
              className="arrow"
              onClick={handleBack}
              disabled={startStep === 0}
            >
              <img src="/images/arrow_right.png" className="iconarrow" alt="" />
            </div>

            <Stepper
              alternativeLabel
              nonLinear
              activeStep={-1}
              sx={{ flex: 1 }}
              // className="sus"
            >
              {cards
                .slice(startStep, startStep + maxVisibleSteps)
                .map((guest, index) => (
                  <Step className="sus" key={guest.id}>
                    <StepLabel
                      StepIconComponent={() => (
                        <div className="ctd">{startStep + index + 1}</div>
                      )}
                    >
                      <div className="guestNames">
                        <img
                          className="guestImage"
                          src="img/bordername.png"
                          alt=""
                        />

                        <p className="guestname">
                          {guest.salutation || "Mr"} .{" "}
                          {guest.first_name || `Guest ${guest.id}`}
                        </p>
                      </div>

                      {getUnpairableGroup(guest.id).length > 0 && (
                        <div
                          className="undoalone"
                          onClick={() =>
                            unpairGroup(getUnpairableGroup(guest.id))
                          }
                        >
                          <Undo />
                          Unpair
                          <BsFillPeopleFill />
                        </div>
                      )}

                      {aloneGuests.includes(guest.id) && (
                        <div
                          className="undoalone"
                          onClick={() => handleUndoAlone(guest.id)}
                        >
                          <Undo />
                          undo
                          <IoPerson />
                        </div>
                      )}
                    </StepLabel>
                    <Box
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {!groups.flat().includes(guest.id) &&
                        !aloneGuests.includes(guest.id) && (
                          <>
                            <Grid container spacing={1} justifyContent="center">
                              <Grid item>
                                <div
                                  className="pair"
                                  onClick={() =>
                                    handleSelectGuestForPairing(guest.id)
                                  }
                                  sx={{
                                    backgroundColor:
                                      selectedGuest === guest.id
                                        ? "lightblue"
                                        : "transparent",
                                    borderColor:
                                      selectedGuest === guest.id
                                        ? "blue"
                                        : "grey",
                                    color:
                                      selectedGuest === guest.id
                                        ? "blue"
                                        : "black",
                                    "&:hover": {
                                      backgroundColor:
                                        selectedGuest === guest.id
                                          ? "lightblue"
                                          : "transparent",
                                    },
                                  }}
                                >
                                  <BsFillPeopleFill />
                                </div>
                              </Grid>

                              <Grid item>
                                <div
                                  className="alone"
                                  variant="outlined"
                                  size="small"
                                  color="warning"
                                  startIcon={<PersonOutline />}
                                  onClick={() => handleStayAlone(guest.id)}
                                >
                                  <IoPerson />
                                </div>
                              </Grid>
                            </Grid>

                            {selectedGuest === guest.id && (
                              <Box sx={{ marginTop: "10px" }}>
                                <Grid
                                  container
                                  spacing={1}
                                  justifyContent="center"
                                >
                                  {guestData
                                    .filter(
                                      (otherGuest) =>
                                        otherGuest.id !== guest.id &&
                                        !groups
                                          .flat()
                                          .includes(otherGuest.id) &&
                                        !aloneGuests.includes(otherGuest.id)
                                    )
                                    .map((otherGuest) => (
                                      <Grid item key={otherGuest.id}>
                                        <div
                                          className="options"
                                          variant="outlined"
                                          size="small"
                                          onClick={() =>
                                            handlePairing(
                                              guest.id,
                                              otherGuest.id
                                            )
                                          }
                                        >
                                          {otherGuest.id}
                                        </div>
                                      </Grid>
                                    ))}
                                </Grid>
                              </Box>
                            )}
                          </>
                        )}
                    </Box>
                  </Step>
                ))}
            </Stepper>

            <div
              onClick={handleNextx}
              className="arrow"
              disabled={startStep + maxVisibleSteps >= initialGuests.length}
            >
              <img
                src="/images/arrow_right.png"
                className="iconarrowR"
                alt=""
              />
              {/* <ArrowForward /> */}
            </div>
          </Box>
        </Box>

        <div className="boss">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",

              alignItems: "Center",
              position: "relative",
              width: "480px",
              height: "350px",
            }}
          >
            <CardStack>
              {cards.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    transform: `translateX(${
                      (currentIndex - index) * -40
                    }px) scale(${index === currentIndex ? 1 : 0.95})`,
                    zIndex: cards.length - Math.abs(currentIndex - index),
                    opacity: currentIndex === index ? 1 : 0.5,
                    transition: "transform 0.3s linear, opacity 0.3s ease",
                  }}
                >
                  <ListItemA
                    item={item}
                    cardno={index}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    groups={groups}
                    initialGuests={initialGuests}
                    handleChangeColor={handleSubmit}
                    minDate={minDate}
                    handleClose={onClose}
                    onInputChange={(field, value) =>
                      handleInputChange(item.id, field, value)
                    }
                    errors={errors[item.id] || {}} // Pass the errors for this specific item
                  />
                </Box>
              ))}
            </CardStack>
          </Box>
        </div>
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
    // </div>
  );
};

const TransportPopup = ({
  onClose,
  onSave,
  cards,
  setCards,
  TaloneGuests,
  TsetAloneGuests,
  Tgroups,
  TsetGroups,
}) => {
  const initialGuests = [...cards];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextx = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevx = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const onInputChange = (id, field, value) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  ////////////

  const [guestData, setGuestData] = useState(initialGuests);

  const [visibleStart, setVisibleStart] = useState(0); // Start of visible range
  const [activeStep, setActiveStep] = useState(0); // Active step index
  const [pairingOptionsVisible, setPairingOptionsVisible] = useState(null); // ID of the guest whose pairing options are visible

  const visibleCount = 3; // Number of visible steps at a time

  // Function to find the group containing a guest
  const findGroupContainingGuest = (guestId) => {
    return Tgroups.find((group) => group.includes(guestId));
  };

  // Function to handle pairing guests
  const handlePairing = (guestId, pairedGuestId) => {
    setGuestData((prevGuestData) => {
      const guestGroup = findGroupContainingGuest(guestId);
      const pairedGuestGroup = findGroupContainingGuest(pairedGuestId);

      let newGroups = [...Tgroups];

      if (guestGroup && pairedGuestGroup && guestGroup !== pairedGuestGroup) {
        // Merge two groups
        const mergedGroup = Array.from(
          new Set([...guestGroup, ...pairedGuestGroup])
        );
        newGroups = newGroups.filter(
          (group) => group !== guestGroup && group !== pairedGuestGroup
        );
        newGroups.push(mergedGroup);
      } else if (guestGroup) {
        // Add pairedGuestId to guestGroup
        newGroups = newGroups.map((group) =>
          group === guestGroup
            ? Array.from(new Set([...group, pairedGuestId]))
            : group
        );
      } else if (pairedGuestGroup) {
        // Add guestId to pairedGuestGroup
        newGroups = newGroups.map((group) =>
          group === pairedGuestGroup
            ? Array.from(new Set([...group, guestId]))
            : group
        );
      } else {
        // Create a new group
        newGroups.push([guestId, pairedGuestId]);
      }

      TsetGroups(newGroups);

      return prevGuestData.filter((g) => !newGroups.flat().includes(g.id));
    });

    // Remove guests from aloneGuests list if they are paired
    TsetAloneGuests((prevAloneGuests) =>
      prevAloneGuests.filter((id) => id !== guestId && id !== pairedGuestId)
    );
  };
  // Function to handle joining a group
  const handleJoinGroup = (guestId, group) => {
    setGuestData((prevGuestData) => {
      const newGroup = [...group, guestId];

      TsetGroups((prevGroups) => [
        ...prevGroups.filter((g) => !g.some((id) => newGroup.includes(id))),
        newGroup,
      ]);

      return prevGuestData.filter((g) => g.id !== guestId);
    });

    // Remove guests from aloneGuests list if they join a group
    TsetAloneGuests((prevAloneGuests) =>
      prevAloneGuests.filter((id) => id !== guestId)
    );
  };
  // Function to handle staying alone
  const handleStayAlone = (guestId) => {
    TsetAloneGuests((prevAloneGuests) => [...prevAloneGuests, guestId]);
    setGuestData((prevGuestData) =>
      prevGuestData.filter((g) => g.id !== guestId)
    );

    // If guest is in a group, remove them from the group
    TsetGroups((prevGroups) =>
      prevGroups.map((group) => group.filter((id) => id !== guestId))
    );
  };
  // Function to handle leaving alone
  const handleLeaveAlone = (guestId) => {
    TsetAloneGuests((prevAloneGuests) =>
      prevAloneGuests.filter((id) => id !== guestId)
    );
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      initialGuests.find((g) => g.id === guestId),
    ]);
  };
  // Function to handle leaving a group
  const handleLeaveGroup = (guestId) => {
    // Find the group that the guest is leaving
    let groupLeft = null;

    TsetGroups((prevGroups) => {
      return prevGroups
        .map((group) => {
          if (group.includes(guestId)) {
            // If the group contains the guest, remove them from the group
            groupLeft = group.filter((id) => id !== guestId);

            // If the group has one or fewer members, dismantle the group
            return groupLeft.length <= 1 ? [] : groupLeft;
          }
          return group;
        })
        .filter((group) => group.length > 0); // Remove any empty groups
    });

    if (groupLeft && groupLeft.length > 0) {
      // Add the remaining members of the group back to the available guests
      setGuestData(
        (prevGuestData) =>
          prevGuestData
            .filter((g) => !groupLeft.includes(g.id)) // Remove remaining group members from guestData
            .concat(
              groupLeft.map((id) => initialGuests.find((g) => g.id === id))
            ) // Add remaining members back to guestData
      );
    }

    // Finally, add the guest who left the group back to the available guests
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      initialGuests.find((g) => g.id === guestId),
    ]);
  };

  // Function to handle the previous button click
  const handlePrev = () => {
    setVisibleStart((prev) => Math.max(prev - 1, 0));
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };
  // Function to handle the next button click
  const handleNext = () => {
    const nextStep = activeStep + 1;
    setVisibleStart((prev) =>
      Math.min(prev + 1, initialGuests.length - visibleCount)
    );
    setActiveStep(nextStep);
  };
  // Function to toggle pairing options visibility
  const togglePairingOptions = (guestId) => {
    setPairingOptionsVisible((prevId) => (prevId === guestId ? null : guestId));
  };
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let validationErrors = [];
    let isValid = true;

    cards.forEach((card, index) => {
      let cardErrors = {};

      // Always validate vehicle_type
      if (!card.vehicle_type) cardErrors.vehicle_type = "required";

      // Validate based on travel_type
      if (card.travel_type === "both") {
        console.log("lol");
        if (!card.t_arrival_at) cardErrors.t_arrival_at = "required";
        if (!card.t_depature_at) cardErrors.t_depature_at = "required";
        if (!card.from_place) cardErrors.from_place = "required";
        if (!card.to_place) cardErrors.to_place = "required";
        if (!card.r_from_plcae) cardErrors.r_from_plcae = "required";
        if (!card.r_to_plcae) cardErrors.r_to_plcae = "required";
      } else if (card.travel_type === "onward") {
        if (!card.t_arrival_at) cardErrors.t_arrival_at = "required";
        if (!card.from_place) cardErrors.from_place = "required";
        if (!card.to_place) cardErrors.to_place = "required";
      } else if (card.travel_type === "return") {
        if (!card.t_depature_at) cardErrors.t_depature_at = "required";
        if (!card.r_from_plcae) cardErrors.r_from_plcae = "required";
        if (!card.r_to_plcae) cardErrors.r_to_plcae = "required";
      }

      if (Object.keys(cardErrors).length > 0) {
        isValid = false;
      }

      validationErrors[index + 1] = cardErrors;
    });

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = () => {
    // Check if all guests are present in either Tgroups or TaloneGuests
    const allGuests = [...Tgroups.flat(), ...TaloneGuests];
    const allGuestIds = cards.map((card) => card.id);
    const allGuestsPresent = allGuestIds.every((guestId) =>
      allGuests.includes(guestId)
    );

    if (!allGuestsPresent) {
      toast.error(
        "Not all guests are accounted for. Please ensure all guests are in a group or alone."
      );
      return; // Prevent closing the popup
    }

    if (validateFields()) {
      const updatedCards = cards.map((card) => ({
        ...card,
        combine_transport_status: 1, // Set guest_status to 1
      }));
      setCards(updatedCards);
      onSave();
      onClose();
    } else {
      toast.error("Validation failed. Please fill out all required fields.");
    }
  };

  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const formattedDate = now.toISOString().slice(0, 16);
    setMinDate(formattedDate);
  }, []);

  return (
    <div className="popup-overlay">
      <div
        className="popup-content transport"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <Box  sx={{ width: "100%", padding: "20px" }}> */}
        <Box className="a" sx={{ display: "flex", alignItems: "center" }}>
          {/* <IconButton onClick={handlePrev} disabled={visibleStart === 0}>
          <ArrowBack />
        </IconButton> */}

          <ToastContainer />

          <div
            onClick={handlePrev}
            className="arrow"
            disabled={visibleStart === 0}
          >
            <img
              src="/images/icons_images/arrow_right.png"
              className="iconarrow"
              alt=""
            />
          </div>

          <Stepper
            alternativeLabel
            nonLinear
            activeStep={activeStep}
            sx={{ flexGrow: 1 }}
          >
            {initialGuests
              .slice(visibleStart, visibleStart + visibleCount)
              .map((guest, index) => {
                const inGroup = findGroupContainingGuest(guest.id);
                const isAlone = TaloneGuests.includes(guest.id);
                const groupMembers = inGroup
                  ? findGroupContainingGuest(guest.id)
                  : [];

                return (
                  <Step key={guest.id}>
                    <StepLabel
                      StepIconComponent={(props) => (
                        <Box
                          {...props}
                          sx={{
                            ...props.sx,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 35,
                            height: 35,
                            borderRadius: "11px",
                            boxShadow:
                              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            borderColor: "primary.main",
                            fontSize: "14px",
                            color: "primary.main",
                          }}
                        >
                          {guest.id}
                        </Box>
                      )}
                    >
                      <div className="guestNames">
                        <img
                          className="guestImage"
                          src="images/icons_images/bordername.png"
                          alt=""
                        />

                        <p className="guestname">
                          {guest.salutation} . {guest.firstName}
                        </p>
                      </div>
                    </StepLabel>

                    <Box sx={{ textAlign: "center" }}>
                      <Grid container spacing={1} justifyContent="center">
                        {/* Pair button should only be visible if the guest is not alone */}
                        {!isAlone && (
                          <Grid item>
                            <div
                              className="pair"
                              onClick={() => togglePairingOptions(guest.id)}
                            >
                              <BsFillPeopleFill />
                            </div>
                          </Grid>
                        )}

                        {/* Stay Alone button always visible */}
                        <Grid item>
                          {!isAlone ? (
                            <div
                              className="alone"
                              onClick={() => handleStayAlone(guest.id)}
                            >
                              <PersonOutline />
                            </div>
                          ) : (
                            <div
                              className="undoalone"
                              onClick={() => handleLeaveAlone(guest.id)}
                            >
                              <Undo />
                              Undo Alone
                            </div>
                          )}
                        </Grid>
                      </Grid>

                      {pairingOptionsVisible === guest.id && !isAlone && (
                        <Box sx={{ marginTop: "10px" }}>
                          {!inGroup && (
                            <Grid container spacing={1} justifyContent="center">
                              {guestData
                                .filter(
                                  (otherGuest) => otherGuest.id !== guest.id
                                )
                                .map((otherGuest) => (
                                  <Grid item key={otherGuest.id}>
                                    <div
                                      className="options"
                                      onClick={() =>
                                        handlePairing(guest.id, otherGuest.id)
                                      }
                                    >
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          display: "block",
                                          marginTop: "2px",
                                        }}
                                      >
                                        {otherGuest.id}
                                      </Typography>
                                    </div>
                                  </Grid>
                                ))}

                              {Tgroups.filter(
                                (group) => !group.includes(guest.id)
                              ).map((group, index) => (
                                <Grid item key={index}>
                                  <div
                                    className="optionsjoin"
                                    onClick={() =>
                                      handleJoinGroup(guest.id, group)
                                    }
                                  >
                                    {/* <GroupAdd /> */}
                                    Join -
                                    <Typography variant="caption">
                                      {group
                                        .map((id) => {
                                          const member = initialGuests.find(
                                            (g) => g.id === id
                                          );
                                          return member ? ` ${id}` : "";
                                        })
                                        .join(" , ")}
                                    </Typography>
                                  </div>
                                </Grid>
                              ))}
                            </Grid>
                          )}

                          {inGroup && (
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{ marginBottom: "5px" }}
                              >
                                Group Members:
                              </Typography>
                              <Grid
                                container
                                spacing={1}
                                justifyContent="center"
                              >
                                {groupMembers.map((memberId) => {
                                  const member = initialGuests.find(
                                    (g) => g.id === memberId
                                  );
                                  return (
                                    <div item key={memberId}>
                                      <Chip
                                        style={{ marginRight: "4px" }}
                                        label={`  ${member.id}`}
                                      />
                                    </div>
                                  );
                                })}
                                <div
                                  className="undoalone"
                                  onClick={() => handleLeaveGroup(guest.id)}
                                >
                                  <GroupRemove />
                                  Leave Group
                                </div>
                              </Grid>
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Step>
                );
              })}
          </Stepper>

          <div
            onClick={handleNext}
            disabled={visibleStart + visibleCount >= initialGuests.length}
          >
            <img
              src="/images/icons_images/arrow_right.png"
              className="iconarrowR"
              alt=""
            />
            {/* <ArrowForward /> */}
          </div>
        </Box>
        {/* </Box> */}

        <div className="boss">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              top: "80px",
              // border:"solid black",
              width: "700px",
              height: "350px",
            }}
          >
            <CardStack>
              {cards.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    transform: `translateX(${
                      (currentIndex - index) * -30
                    }px) scale(${index === currentIndex ? 1 : 0.95})`,
                    zIndex: cards.length - Math.abs(currentIndex - index),
                    opacity: currentIndex === index ? 1 : 0.5,
                    transition: "transform 0.3s linear, opacity 0.3s ease",
                  }}
                >
                  <ListItemT
                    item={item}
                    cardno={index}
                    onPrev={handlePrevx}
                    onNext={handleNextx}
                    groups={Tgroups}
                    tripType={cards.travel_type}
                    initialGuests={initialGuests}
                    minDate={minDate}
                    handleChangeColor={handleSubmit}
                    handleClose={onClose}
                    onInputChange={onInputChange}
                    errors={errors[item.id] || {}} // Pass the errors for this specific item
                  />
                </Box>
              ))}
            </CardStack>
          </Box>
        </div>

        <div className="transportsave">
          <button onClick={handleSubmit}>Save</button>
          {/* <button onClick={onClose}>Cancel</button> */}
        </div>
      </div>
    </div>
  );
};

const VenuePopup = ({ onClose, onSave, VenueData, setVenueData }) => {
  const [errors, setErrors] = useState({});
  const [initialFormData, setInitialFormData] = useState({});

  useEffect(() => {
    // Store the initial form data when the popup is opened
    setInitialFormData(VenueData);
  }, []);

  const handleSliderChange = (key) => (event, newValue) => {
    setVenueData((prevState) => ({ ...prevState, [key]: newValue }));
  };

  const handleInputChange = (key) => (event) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    setVenueData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleBlur = (key, value) => () => {
    if (value < 0) {
      setVenueData((prevState) => ({ ...prevState, [key]: 0 }));
    }
  };

  const handleIncrement = (key, value, max) => () => {
    if (value < max) {
      setVenueData((prevState) => ({ ...prevState, [key]: value + 1 }));
    }
  };

  const handleDecrement = (key, value) => () => {
    if (value > 0) {
      setVenueData((prevState) => ({ ...prevState, [key]: value - 1 }));
    }
  };

  const handleVenueTypeChange = (venue_type) => {
    setVenueData((prevState) => ({ ...prevState, venue_type }));
  };

  const renderSliderWithCounter = (label, key, max = 10) => (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="subtitle1">{label}</Typography>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Slider
          value={VenueData[key]}
          onChange={handleSliderChange(key)}
          aria-labelledby={`${label.toLowerCase().replace(/\s/g, "-")}-slider`}
          min={0}
          max={max}
          step={1}
          style={{ flexGrow: 1 }}
          valueLabelDisplay="auto"
        />
        <div
          className="spbuttonsicon"
          onClick={handleDecrement(key, VenueData[key])}
        >
          <RemoveIcon />
        </div>
        <TextField
          value={VenueData[key]}
          onChange={handleInputChange(key)}
          onBlur={handleBlur(key, VenueData[key])}
          style={{ width: 70 }}
          inputProps={{
            step: 1,
            min: 0,
            type: "number",
            style: { MozAppearance: "textfield" },
          }}
          InputProps={{
            inputProps: { min: 0, style: { MozAppearance: "textfield" } },
            sx: {
              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "&[type=number]": {
                MozAppearance: "textfield",
              },
            },
          }}
        />
        <div
          className="spbuttonsicon"
          onClick={handleIncrement(key, VenueData[key], max)}
        >
          <AddIcon />
        </div>
      </div>
    </div>
  );

  const renderVenueTypeButton = (type, label) => (
    <Tooltip title={label} key={type}>
      <div
        onClick={() => handleVenueTypeChange(type)}
        style={{
          padding: "10px 15px",
          margin: "0 5px",
          cursor: "pointer",
          borderRadius: "4px",
          backgroundColor:
            VenueData.venue_type === type ? "#1976d2" : "#f0f0f0",
          color: VenueData.venue_type === type ? "white" : "black",
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </Tooltip>
  );

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // Validate venue count
    if (VenueData["venue_count"] < 1) {
      newErrors["venue_count"] = "Venue count must be at least 1";
      isValid = false;
    }

    // Validate venue type
    const venueTypes = ["Classrooms", "Seminar Hall", "Auditorium", "Labs"];
    if (!venueTypes.includes(VenueData.venue_type)) {
      newErrors.venueTypes = "You must select a valid venue type.";
      isValid = false;
    }

    // Validate capacity
    if (VenueData["capacity"] < 60) {
      newErrors["capacity"] = "Venue capacity must be at least 60";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave();
      onClose();
    }
  };

  const handleCancel = () => {
    // Reset form data to the initial state when cancel is clicked
    setVenueData(initialFormData);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div
        className="popup-content"
        style={{ width: "30%", height: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Venue Details</h2>
        {renderSliderWithCounter("Venue Count", "venue_count", 10)}
        {errors["venue_count"] && (
          <div style={{ color: "red", fontSize: "12px" }}>
            {errors["venue_count"]}
          </div>
        )}
        <Typography variant="subtitle1">Venue Type</Typography>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          {renderVenueTypeButton("Classrooms", "Classrooms")}
          {renderVenueTypeButton("Seminar Hall", "Seminar Hall")}
          {renderVenueTypeButton("Auditorium", "Auditorium")}
          {renderVenueTypeButton("Labs", "Labs")}
        </div>
        {errors.venueTypes && (
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.venueTypes}
          </span>
        )}
        {renderSliderWithCounter(
          "Total Count of Participants",
          "capacity",
          1000
        )}

        {errors["capacity"] && (
          <div style={{ color: "red", fontSize: "12px" }}>
            {errors["capacity"]}
          </div>
        )}
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const VenueRequirementPopup = ({
  onClose,
  onSave,
  quantities,
  setQuantities,
  selectedContent,
  setSelectedContent,
  selected,
  setSelected,
}) => {
  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false);
  const TickIcon = () => (
    <svg
      width="35"
      height="35"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M75 37.5C75 55.1775 75 64.0166 69.5081 69.5081C64.0166 75 55.1775 75 37.5 75C19.8223 75 10.9835 75 5.49176 69.5081C-1.54171e-06 64.0166 -9.4353e-07 55.1775 -6.41247e-07 37.5C-3.3896e-07 19.8223 -6.34851e-07 10.9835 5.49176 5.49176C10.9835 -2.59218e-07 19.8223 3.3896e-07 37.5 6.41247e-07C55.1775 9.4353e-07 64.0166 6.47644e-07 69.5081 5.49176C75 10.9835 75 19.8223 75 37.5ZM57.9544 18.3879C59.19 19.3292 59.4285 21.0939 58.4872 22.3295L32.7727 56.0794C32.2609 56.7514 31.4737 57.1579 30.6292 57.186C29.785 57.2141 28.9726 56.8613 28.417 56.2245L16.6313 42.7245C15.6097 41.5545 15.7302 39.7778 16.9003 38.7562C18.0705 37.7347 19.8472 37.8551 20.8687 39.0255L30.3874 49.9286L54.0128 18.9205C54.9544 17.685 56.7191 17.4465 57.9544 18.3879Z"
        fill="url(#paint0_linear_1687_8254)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1687_8254"
          x1="37.5"
          y1="6.41247e-07"
          x2="37.5"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.00666656" stopColor="#639365" />
          <stop offset="1" stopColor="#25C03E" stopOpacity="0.92" />
        </linearGradient>
      </defs>
    </svg>
  );

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#2B3674",
      },
    },
  });

  const handleClick = (item) => {
    setSelectedContent((prevSelectedContent) => {
      if (prevSelectedContent.includes(item.dbname)) {
        const updatedSelectedContent = prevSelectedContent.filter(
          (content) => content !== item.dbname
        );
        const updatedQuantities = { ...quantities };
        delete updatedQuantities[item.dbname];
        setQuantities(updatedQuantities);
        return updatedSelectedContent;
      } else {
        // Set initial quantity to 1 when an item is selected
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [item.dbname]: 1,
        }));
        return [...prevSelectedContent, item.dbname];
      }
    });
    setSelected((prevSelectedContent) => {
      if (prevSelectedContent.includes(item.name)) {
        const updatedSelectedContent = prevSelectedContent.filter(
          (content) => content !== item.name
        );
        return updatedSelectedContent;
      } else {
        // Set initial quantity to 1 when an item is selected

        return [...prevSelectedContent, item.name];
      }
    });
  };

  const handleQuantityChange = (itemDbname, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemDbname]: quantity,
    }));
  };

  const handleSubmit = () => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      venue_requirement_status: 1, // Update venue_requirement_status to 1 when Confirm is clicked
    }));
    onSave(); // Trigger the save action
    onClose(); // Close the popup
  };

  const openQuantityDialog = () => {
    setQuantityDialogOpen(true);
  };

  const closeQuantityDialog = () => {
    setQuantityDialogOpen(false);
  };
  const items = [
    { dbname: "chair_count", name: "Guest chair", image: "/img/chair.png" },
    { dbname: "dais_table_count", name: "Dais Table", image: "/img/Table.png" },
    {
      dbname: "white_board_count",
      name: "White Board",
      image: "/img/board.png",
    },
    { dbname: "hand_mic_count", name: "Help Desk", image: "/img/desk.png" },
    { dbname: "help_desk_count", name: "Hand Mic", image: "/img/handmic.png" },
    {
      dbname: "collar_mic_count",
      name: "Collar Mic",
      image: "/img/collarmic.png",
    },
    {
      dbname: "internet_count",
      name: "Internet",
      image: "/img/internet.png",
    },
    {
      dbname: "live_stream_count",
      name: "Live Streaming",
      image: "/img/live.png",
    },
    {
      dbname: "biometric_count",
      name: "Biometric Device",
      image: "/img/biometric.png",
    },
    {
      dbname: "photography_count",
      name: "Photography",
      image: "/img/photography.png",
    },
    {
      dbname: "videography_count",
      name: "Videography",
      image: "/img/videography.png",
    },
    {
      dbname: "large_momento_count",
      name: "Large Momento",
      image: "/img/largemomento.png",
    },
    {
      dbname: "small_momento_count",
      name: "Small Momento",
      image: "/img/smallmomento.png",
    },
    { dbname: "shawl_count", name: "Shawl", image: "/img/Shawl.png" },
    { dbname: "pen_pencil_count", name: "Pen/Pencil", image: "/img/pen.png" },
    {
      dbname: "scribbling_pad_count",
      name: "Scribbling Pad",
      image: "/img/pad.png",
    },
    {
      dbname: "water_bottle_count",
      name: "Water Bottle",
      image: "/img/waterbottle.png",
    },
    { dbname: "others", name: "Others", image: "/img/others.png" },
  ];

  return (
    <div className="popup-overlay">
      <div
        className="popup-content"
        style={{ width: "80%", height: "80%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <ThemeProvider theme={theme}>
          <div className="itemschoosing">
            <h3>Venue Requirements</h3>
            <h3>Select the items you need for your venue</h3>
            <div className="flex">
              <div className="grid-container">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className={`grid-item ${
                      selectedContent.includes(item.name) ? "selected" : ""
                    }`}
                    onClick={() => handleClick(item)}
                  >
                    <div
                      className="circlex"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {selectedContent.includes(item.dbname) && <TickIcon />}
                    </div>
                    <div className="item-name">{item.name}</div>
                  </div>
                ))}
              </div>

              <Dialog open={quantityDialogOpen} onClose={closeQuantityDialog}>
                <DialogTitle>Selected Items and Quantities</DialogTitle>
                <DialogContent>
                  <div style={{ marginBottom: "10px" }}>
                    {selected.map((itemName, index) => {
                      const itemDbname = items.find(
                        (item) => item.name === itemName
                      )?.dbname;

                      if (itemDbname && selectedContent.includes(itemDbname)) {
                        return (
                          <div
                            key={itemName}
                            style={{
                              marginBottom: "10px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="body1">{itemName}</Typography>
                            <TextField
                              label="Quantity"
                              type="number"
                              style={{ marginBottom: "10px", width: "50%" }}
                              value={quantities[itemDbname]}
                              onChange={(e) =>
                                handleQuantityChange(itemDbname, e.target.value)
                              }
                              fullWidth
                              margin="dense"
                              inputProps={{ min: 1, max: 10 }} // Set min and max range here
                            />
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </DialogContent>
                <DialogActions>
                  <button onClick={closeQuantityDialog} color="primary">
                    Cancel
                  </button>

                  <button onClick={handleSubmit} color="primary">
                    Confirm
                  </button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="popup-buttons">
              <button onClick={openQuantityDialog}>Save</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export {
  EventPopup,
  GuestPopup,
  ParticipantsPopup,
  AccomodationPopup,
  TransportPopup,
  VenuePopup,
  VenueRequirementPopup,
};
