import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Slider,
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FoodIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import CalendarIcon from "@mui/icons-material/CalendarToday";
import LocationIcon from "@mui/icons-material/LocationOn";
import RemoveIcon from "@mui/icons-material/Remove";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns"; // Importing addDays to calculate the minimum date
import AssignButton from "./assignbutton";

const SpecialRequest = ({ event_id, SpecialRequestData,user }) => {
  const [open, setOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [barColors, setBarColors] = useState({
    car: "#ff6f61",
    soup: "#ff6f61",
    fastfood: "#ff6f61",
    add: "#ff6f61",
  });

  const handleClickOpen = (box) => {
    setSelectedBox(box);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setSelectedBox(null);
  };
  
  const [disabledItems, setDisabledItems] = useState(new Set()); // Track disabled items

  const getDialogContent = () => {
    switch (selectedBox) {
      case "soup":
        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Preferred food
            </Typography>
            <TextField
              disabled
              value={SpecialRequestData.preferred_food || "Null"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FoodIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Time
            </Typography>
            <input
              disabled
              style={{
                width: "90%",
                border: "solid 1px #9CA3AF",
                padding: "20px",
                fontSize: "15px",
                color: "#9CA3AF",
                borderRadius: "5px",
              }}
              id="end_at"
              name="end_at"
              value={
                SpecialRequestData.food_time
                  ? `${new Date(
                      SpecialRequestData.food_time
                    ).toLocaleDateString("en-GB")} (${new Date(
                      SpecialRequestData.food_time
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })})`
                  : " - "
              }
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Venue to give
            </Typography>
            <TextField
              disabled
              value={SpecialRequestData.food_to_venue || "Null"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Quantity
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                width: "100%",
              }}
            >
              <Slider
                disabled
                value={SpecialRequestData.food_quantity || 0}
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ marginRight: 2 }}
              />
              <div
                className="spbuttonsicon"
                // onClick={handleRemove}
              >
                <RemoveIcon />
              </div>
              <TextField
                value={SpecialRequestData.food_quantity || " - "}
                size="small"
                sx={{ width: 85, marginRight: 1, marginLeft: 1 }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <div
                className="spbuttonsicon"
                //  onClick={handleAdd}
              >
                <AddIcon />
              </div>
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                gap: "20px",
              }}
            >
              {user === "eventmanager" && SpecialRequestData.food_request_status === 1 && (
              <AssignButton
                event_id={event_id}
                key={"Food_Request"} // Ensure this is a unique value
                item={"Food_Request"} // Ensure Food_Request is a valid value
                isDisabled={disabledItems.has("Food_Request")} // Check if disabledItems supports .has() or use .includes() for arrays
              />)}
              <div
                onClick={handleClose}
                style={{
                  background: "#1b75d5",
                  color: "white",
                  borderRadius: "6px",
                  padding: "5px",
                  textAlign: "center",
                  width: "80px",
                }}
              >
                Close
              </div>
            </div>
          </>
        );
      case "car":
        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Quantity
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                width: "100%",
              }}
            >
              <Slider
                value={SpecialRequestData.car_count || 0}
                sx={{ marginRight: 2 }} // Added space between slider and buttons
              />
              <div
                className="spbuttonsicon"
                // onClick={handleRemove}
              >
                <RemoveIcon />
              </div>
              <TextField
                value={SpecialRequestData.car_count || " - "}
                disabled
                size="small"
                sx={{ width: 90, marginRight: 1, marginLeft: 1 }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <div
                className="spbuttonsicon"
                // onClick={handleAdd}
              >
                <AddIcon />
              </div>
            </Box>

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Arrival
            </Typography>

            <input
              disabled
              style={{
                width: "90%",
                border: "solid 1px #9CA3AF",
                padding: "20px",
                fontSize: "15px",
                color: "#9CA3AF",
                borderRadius: "5px",
              }}
              id="end_at"
              name="end_at"
              value={
                SpecialRequestData.car_arrival_at
                  ? `${new Date(
                      SpecialRequestData.car_arrival_at
                    ).toLocaleDateString("en-GB")} (${new Date(
                      SpecialRequestData.car_arrival_at
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })})`
                  : " - "
              }
            />

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Departure
            </Typography>

            <input
              disabled
              style={{
                width: "90%",
                border: "solid 1px #9CA3AF",
                padding: "20px",
                fontSize: "15px",
                color: "#9CA3AF",
                borderRadius: "5px",
              }}
              id="end_at"
              name="end_at"
              value={
                SpecialRequestData.car_departure_at
                  ? `${new Date(
                      SpecialRequestData.car_departure_at
                    ).toLocaleDateString("en-GB")} (${new Date(
                      SpecialRequestData.car_departure_at
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })})`
                  : " - "
              }
            />

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Vehicle Type
            </Typography>
            <FormControl fullWidth>
              <input
                disabled
                style={{
                  width: "90%",
                  border: "solid 1px #9CA3AF",
                  padding: "20px",
                  fontSize: "15px",
                  color: "#9CA3AF",
                  borderRadius: "5px",
                }}
                type="text"
                id="end_at"
                name="end_at"
                value={SpecialRequestData.car_type || "Null"}
              />
            </FormControl>
            <div style={{marginTop:"25px"}}></div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                gap: "20px",
              }}
            >
              {user === "eventmanager" && SpecialRequestData.car_request_status === 1 && (
              <AssignButton
                event_id={event_id}
                key={"Car_Request"} // Ensure this is a unique value
                item={"Car_Request"} // Ensure Food_Request is a valid value
                isDisabled={disabledItems.has("Car_Request")} // Check if disabledItems supports .has() or use .includes() for arrays
              />)}
              <div
                onClick={handleClose}
                style={{
                  background: "#1b75d5",
                  color: "white",
                  borderRadius: "6px",
                  padding: "5px",
                  textAlign: "center",
                  width: "80px",
                }}
              >
                Close
              </div>
            </div>
          </>
        );
      case "fastfood":
        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Preferred Refreshment
            </Typography>
            <TextField
              disabled
              value={SpecialRequestData.refreshment_dish || "Null"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FoodIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Time
            </Typography>
            <input
              disabled
              style={{
                width: "90%",
                border: "solid 1px #9CA3AF",
                padding: "20px",
                fontSize: "15px",
                color: "#9CA3AF",
                borderRadius: "5px",
              }}
              id="end_at"
              name="end_at"
              value={
                SpecialRequestData.refreshment_time
                  ? `${new Date(
                      SpecialRequestData.refreshment_time
                    ).toLocaleDateString("en-GB")} (${new Date(
                      SpecialRequestData.refreshment_time
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })})`
                  : " - "
              }
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Venue to give
            </Typography>
            <TextField
              disabled
              value={SpecialRequestData.refreshment_to_venue || "Null"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Quantity
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                width: "100%",
              }}
            >
              <Slider
                value={SpecialRequestData.refreshment_quantity || 0}
                disabled
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ marginRight: 2 }} // Added space between slider and buttons
              />
              <div
                className="spbuttonsicon"
                // onClick={handleRemove}
              >
                <RemoveIcon />
              </div>
              <TextField
                disabled
                value={SpecialRequestData.refreshment_quantity || " - "}
                size="small"
                sx={{ width: 85, marginRight: 1, marginLeft: 1 }}
                InputProps={{
                  readOnly: true,
                }}
              />

              <div
                className="spbuttonsicon"
                //  onClick={handleAdd}
              >
                <AddIcon />
              </div>
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                gap: "20px",
              }}
            >
              {user === "eventmanager" && SpecialRequestData.refreshment_request_status === 1 && (
                <AssignButton
                  event_id={event_id}
                  key={"Refreshment_Request"} // Ensure this is a unique value
                  item={"Refreshment_Request"} // Ensure Food_Request is a valid value
                  isDisabled={disabledItems.has("Refreshment_Request")} // Check if disabledItems supports .has() or use .includes() for arrays
                />
              )}
              <div
                onClick={handleClose}
                style={{
                  background: "#1b75d5",
                  color: "white",
                  borderRadius: "6px",
                  padding: "5px",
                  textAlign: "center",
                  width: "80px",
                }}
              >
                Close
              </div>
            </div>
          </>
        );
      case "add":
        return <p>Add new item-related content goes here.</p>;
      default:
        return <p>Select a box to see the content.</p>;
    }
  };

  const boxes = [
    { id: "car", image: "/img/car.png" },
    { id: "soup", image: "/img/soup.png" },
    { id: "fastfood", image: "/img/fastfood.png" },
    // { id: "add", icon: <AddIcon sx={{ fontSize: 40, color: "#03a9f4" }} /> },
  ];

  return (
    <div className="specialrequest">
      {boxes.map((box) => (
        <Box
          key={box.id}
          display="flex"
          flexDirection="column"
          alignItems="center"
          onClick={() => handleClickOpen(box.id)}
          sx={{
            cursor: "pointer",
            "&:hover .hover-bar": { opacity: 1 },
          }}
        >
          <div className="sr">
            {box.image ? (
              <img src={box.image} className="picsr" alt="" />
            ) : (
              box.icon
            )}
          </div>
          <Box
            className="hover-bar"
            sx={{
              height: "4px",
              width: "60%",
              backgroundColor: barColors[box.id],
              marginTop: "5px",
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          />
        </Box>
      ))}

      {/* Dialog */}
      <Dialog
        open={open}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
          },
        }}
      >
        <DialogContent>{getDialogContent()}</DialogContent>
      </Dialog>
    </div>
  );
};

export default SpecialRequest;
