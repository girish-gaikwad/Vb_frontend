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

const SpecialRequest = ({ event_id, SpecialRequestData }) => {
  const [open, setOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [barColors, setBarColors] = useState({
    car: "#ff6f61",
    soup: "#ff6f61",
    fastfood: "#ff6f61",
    add: "#ff6f61",
  });

  // Handle opening the dialog
  const handleClickOpen = (box) => {
    setSelectedBox(box);
    setOpen(true);

    //  Initialize temporary state based on selected box
    switch (box) {
      case "soup":
        // setTempSoupData({ ...soupData });
        break;
      case "car":
        // setTempCarData({ ...carData });
        break;
      case "fastfood":
        // setTempFastfoodData({ ...fastfoodData });
        break;
      default:
        break;
    }
  };

  // Handle closing the dialog
  const handleClose = () => {
    setOpen(false);
    // setSelectedBox(null);
  };

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
              // value={tempSoupData.food || "chapathi"}
              value={"chapathi"}
              onChange={(e) =>
                setTempSoupData((prev) => ({ ...prev, food: e.target.value }))
              }
              placeholder="Eg: Chappathi"
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
              placeholder="Select Date and Time"
              style={{
                width: "90%",
                border: "solid 1px #9CA3AF",
                padding: "20px",
                fontSize: "15px",
                color: "#9CA3AF",
                borderRadius: "5px",
                marginBottom: "16px",
              }}
              type="datetime-local"
              id="end_at"
              name="end_at"
              // value={tempSoupData.time || ""}
              value={" 26-08-2024 2.00pm "}
              // onChange={(e) =>
              //   setTempSoupData((prev) => ({ ...prev, time: e.target.value }))
              // }
              // min={minDate}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Venue to give
            </Typography>
            <TextField
              disabled
              // value={tempSoupData.venue || ""}
              value={"mess"}
              // onChange={(e) =>
              //   setTempSoupData((prev) => ({ ...prev, venue: e.target.value }))
              // }
              placeholder="Eg: BIT Guest House"
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
                // value={tempSoupData.quantity || 0}
                value={88}
                // onChange={handleSliderChange}
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
                // value={tempSoupData.quantity}
                value={88}
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
                // value={tempCarData.quantity || 0}
                value={88}
                // onChange={handleSliderChange}
                step={1}
                min={0}
                max={100}
                disabled
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
                // value={tempCarData.quantity || 0}
                disabled
                value={88}
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
              placeholder="Select Date and Time"
              style={{
                width: "90%",
                border: "solid 1px #9CA3AF",
                padding: "20px",
                fontSize: "15px",
                color: "#9CA3AF",
                borderRadius: "5px",
              }}
              type="datetime-local"
              id="end_at"
              name="end_at"
              // value={tempCarData.arrival || ""}
              value={"26-07-2024 6:00pm"}
              // onChange={(e) =>
              //   setTempCarData((prev) => ({
              //     ...prev,
              //     arrival: e.target.value,
              //   }))
              // }
            />

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Departure
            </Typography>

            <input
              placeholder="Select Date and Time"
              disabled
              style={{
                width: "90%",
                border: "solid 1px #9CA3AF",
                padding: "20px",
                fontSize: "15px",
                color: "#9CA3AF",
                borderRadius: "5px",
              }}
              type="datetime-local"
              id="end_at"
              name="end_at"
              // value={tempCarData.departure || ""}
              value={"27-08-2024 7:00am"}
              // onChange={(e) =>
              //   setTempCarData((prev) => ({
              //     ...prev,
              //     departure: e.target.value,
              //   }))
              // }
              // min={minDate}
            />

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Vehicle Type
            </Typography>
            <FormControl fullWidth>
              <Select
                disabled
                labelId="car-select-label"
                // value={tempCarData.vehicleType || ""}
                value={"BMW"}
                // onChange={(e) =>
                //   setTempCarData((prev) => ({
                //     ...prev,
                //     vehicleType: e.target.value,
                //   }))
                // }
                label="Select Car"
                endAdornment={
                  <InputAdornment position="end">
                    <DirectionsCarIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="BMW">BMW</MenuItem>
                <MenuItem value="Audi">Audi</MenuItem>
                <MenuItem value="Mercedes">Mercedes</MenuItem>
              </Select>
            </FormControl>
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
              // value={tempFastfoodData.refreshment || ""}
              value={"maggie"}
              // onChange={(e) =>
              //   setTempFastfoodData((prev) => ({
              //     ...prev,
              //     refreshment: e.target.value,
              //   }))
              // }
              placeholder="Eg: Chappathi"
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
              placeholder="Select Date and Time"
              style={{
                width: "90%",
                border: "solid 1px #9CA3AF",
                padding: "20px",
                fontSize: "15px",
                color: "#9CA3AF",
                borderRadius: "5px",
              }}
              type="datetime-local"
              id="end_at"
              name="end_at"
              // value={tempFastfoodData.time || ""}
              value={"28-98-2024 8:00pm"}
              // onChange={(e) =>
              //   setTempFastfoodData((prev) => ({
              //     ...prev,
              //     time: e.target.value,
              //   }))
              // }
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Venue to give
            </Typography>
            <TextField
              disabled
              // value={tempFastfoodData.venue || ""}
              value={"BIT GUEST HOUSE"}
              // onChange={(e) =>
              //   setTempFastfoodData((prev) => ({
              //     ...prev,
              //     venue: e.target.value,
              //   }))
              // }
              placeholder="Eg: BIT Guest House"
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
                // value={tempFastfoodData.quantity || 0}
                value={60}
                disabled
                // onChange={handleSliderChange}
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
                // value={tempFastfoodData.quantity}
                value={65}
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
        <DialogActions>
          <AssignButton
          // event_id={event_id}
          // key={item.id}
          // adminasign={adminasign}
          // item={item.id}
          // isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
          />

          <div
            onClick={handleClose}
            style={{
              background: "#1b75d5",
              color: "white",
              borderRadius: "6px",
              padding: "5px",
              textAlign: "center",
              width: "80px",
              marginBottom: "20px",
            }}
          >
            Close
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpecialRequest;
