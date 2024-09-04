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
import "./specialrequest.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns"; // Importing addDays to calculate the minimum date

const SpecialRequest = ({
  soupData,
  setSoupData,
  carData,
  setCarData,
  fastfoodData,
  setFastfoodData,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [barColors, setBarColors] = useState({
    car: "#ff6f61",
    soup: "#ff6f61",
    fastfood: "#ff6f61",
    add: "#ff6f61",
  });

  const [minDate, setMinDate] = useState("");

  const [tempSoupData, setTempSoupData] = useState({});
  const [tempCarData, setTempCarData] = useState({});
  const [tempFastfoodData, setTempFastfoodData] = useState({});

  const [soupErrors, setSoupErrors] = useState({});
  const [carErrors, setCarErrors] = useState({});
  const [fastfoodErrors, setFastfoodErrors] = useState({});

  useEffect(() => {
    // Set the minimum date for the datetime-local inputs
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const formattedDate = now.toISOString().slice(0, 16);
    setMinDate(formattedDate);
  }, []);

  // Handle opening the dialog
  const handleClickOpen = (box) => {
    setSelectedBox(box);
    setOpen(true);

    //  Initialize temporary state based on selected box
    switch (box) {
      case "soup":
        setTempSoupData({ ...soupData });
        break;
      case "car":
        setTempCarData({ ...carData });
        break;
      case "fastfood":
        setTempFastfoodData({ ...fastfoodData });
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

  const validateSoupData = () => {
    const errors = {};

    if (!tempSoupData.food) {
      errors.food = "Preferred food is required.";
    }
    if (!tempSoupData.time) {
      errors.time = "Time is required.";
    }
    if (!tempSoupData.venue) {
      errors.venue = "Venue is required.";
    }
    if (tempSoupData.quantity === 0) {
      errors.quantity = "!";
    }

    setSoupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCarData = () => {
    const errors = {};

    if (!tempCarData.quantity) {
      errors.quantity = "!  ";
    }
    if (!tempCarData.arrival) {
      errors.arrival = "Arrival time is required.";
    }
    if (!tempCarData.departure) {
      errors.departure = "Departure time is required.";
    }
    if (!tempCarData.vehicleType) {
      errors.vehicleType = "Vehicle type is required.";
    }

    setCarErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateFastfoodData = () => {
    const errors = {};

    if (!tempFastfoodData.refreshment) {
      errors.refreshment = "Preferred refreshment is required.";
    }
    if (!tempFastfoodData.time) {
      errors.time = "Time is required.";
    }
    if (!tempFastfoodData.venue) {
      errors.venue = "Venue is required.";
    }
    if (tempFastfoodData.quantity === 0) {
      errors.quantity = "!";
    }

    setFastfoodErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    let isValid = false;

    switch (selectedBox) {
      case "soup":
        isValid = validateSoupData();
        break;
      case "car":
        isValid = validateCarData();
        break;
      case "fastfood":
        isValid = validateFastfoodData();
        break;
      default:
        isValid = true;
    }

    if (!isValid) {
      return; // Prevent closing the dialog and updating the state if validation fails
    }

    switch (selectedBox) {
      case "soup":
        setSoupData({ ...tempSoupData });
        break;
      case "car":
        setCarData({ ...tempCarData });
        break;
      case "fastfood":
        setFastfoodData({ ...tempFastfoodData });
        break;
      default:
        break;
    }

    console.log([selectedBox]);
    setBarColors((prev) => ({
      ...prev,
      [selectedBox]: "#03a9f4", // Change the color to blue
    }));
    handleClose();
  };

  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    switch (selectedBox) {
      case "soup":
        setTempSoupData((prev) => ({ ...prev, quantity: newValue }));
        break;
      case "car":
        setTempCarData((prev) => ({ ...prev, quantity: newValue }));
        break;
      case "fastfood":
        setTempFastfoodData((prev) => ({ ...prev, quantity: newValue }));
        break;
      default:
        break;
    }
  };

  // Handle increment and decrement

  const handleAdd = () => {
    switch (selectedBox) {
      case "soup":
        setTempSoupData((prev) => ({
          ...prev,
          quantity: Math.min(prev.quantity + 1, 100),
        }));
        break;
      case "car":
        setTempCarData((prev) => ({
          ...prev,
          quantity: Math.min(prev.quantity + 1, 100),
        }));
        break;
      case "fastfood":
        setTempFastfoodData((prev) => ({
          ...prev,
          quantity: Math.min(prev.quantity + 1, 100),
        }));
        break;
      default:
        break;
    }
  };

  const handleRemove = () => {
    switch (selectedBox) {
      case "soup":
        setTempSoupData((prev) => ({
          ...prev,
          quantity: Math.max(prev.quantity - 1, 0),
        }));
        break;
      case "car":
        setTempCarData((prev) => ({
          ...prev,
          quantity: Math.max(prev.quantity - 1, 0),
        }));
        break;
      case "fastfood":
        setTempFastfoodData((prev) => ({
          ...prev,
          quantity: Math.max(prev.quantity - 1, 0),
        }));
        break;
      default:
        break;
    }
  };

  // console.log(fastfoodData);
  // Render dialog content based on the selected box
  const getDialogContent = () => {
    switch (selectedBox) {
      case "soup":
        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Preferred food
            </Typography>
            <TextField
              value={tempSoupData.food || ""}
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
              error={!!soupErrors.food}
              helperText={soupErrors.food}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Time
            </Typography>
            <input
              placeholder="Select Date and Time"
              style={{
                width: "90%",
                border: "solid 1px #9CA3AF",
                padding: "20px",
                fontSize: "15px",
                color: "#9CA3AF",
                borderRadius: "5px",
                marginBottom: !!soupErrors.time ? "0px" : "16px",
              }}
              type="datetime-local"
              id="end_at"
              name="end_at"
              value={tempSoupData.time || ""}
              onChange={(e) =>
                setTempSoupData((prev) => ({ ...prev, time: e.target.value }))
              }
              min={minDate}
            />
            {!!soupErrors.time && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {soupErrors.time}
              </Typography>
            )}

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Venue to give
            </Typography>
            <TextField
              value={tempSoupData.venue || ""}
              onChange={(e) =>
                setTempSoupData((prev) => ({ ...prev, venue: e.target.value }))
              }
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
              error={!!soupErrors.venue}
              helperText={soupErrors.venue}
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
                value={tempSoupData.quantity || 0}
                onChange={handleSliderChange}
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ marginRight: 2 }}
                error={!!soupErrors.quantity}
              />
              <div className="spbuttonsicon" onClick={handleRemove}>
                <RemoveIcon />
              </div>
              <TextField
                value={tempSoupData.quantity}
                size="small"
                sx={{ width: 85, marginRight: 1, marginLeft: 1 }}
                InputProps={{
                  readOnly: true,
                }}
                error={!!soupErrors.quantity}
                helperText={soupErrors.quantity}
              />
              <div className="spbuttonsicon" onClick={handleAdd}>
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
                value={tempCarData.quantity || 0}
                onChange={handleSliderChange}
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ marginRight: 2 }} // Added space between slider and buttons
              />
              <div className="spbuttonsicon" onClick={handleRemove}>
                <RemoveIcon />
              </div>
              <TextField
                value={tempCarData.quantity || 0}
                size="small"
                sx={{ width: 90, marginRight: 1, marginLeft: 1 }}
                InputProps={{
                  readOnly: true,
                }}
                error={!!carErrors.quantity}
                helperText={carErrors.quantity}
              />
              <div className="spbuttonsicon" onClick={handleAdd}>
                <AddIcon />
              </div>
            </Box>

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Arrival
            </Typography>

            <input
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
              value={tempCarData.arrival || ""}
              onChange={(e) =>
                setTempCarData((prev) => ({
                  ...prev,
                  arrival: e.target.value,
                }))
              }
              min={minDate}
            />
            {!!carErrors.arrival && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {carErrors.arrival}
              </Typography>
            )}

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Departure
            </Typography>

            <input
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
              value={tempCarData.departure || ""}
              onChange={(e) =>
                setTempCarData((prev) => ({
                  ...prev,
                  departure: e.target.value,
                }))
              }
              min={minDate}
            />
            {!!carErrors.departure && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {carErrors.departure}
              </Typography>
            )}

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Vehicle Type
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="car-select-label">Select Car</InputLabel> */}
              <Select
                labelId="car-select-label"
                value={tempCarData.vehicleType || ""}
                onChange={(e) =>
                  setTempCarData((prev) => ({
                    ...prev,
                    vehicleType: e.target.value,
                  }))
                }
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

            {!!carErrors.vehicleType && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {carErrors.vehicleType}
              </Typography>
            )}
          </>
        );
      case "fastfood":
        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Preferred Refreshment
            </Typography>
            <TextField
              value={tempFastfoodData.refreshment || ""}
              onChange={(e) =>
                setTempFastfoodData((prev) => ({
                  ...prev,
                  refreshment: e.target.value,
                }))
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
              error={!!fastfoodErrors.refreshment}
              helperText={fastfoodErrors.refreshment}
              sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Time
            </Typography>
            <input
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
              value={tempFastfoodData.time || ""}
              onChange={(e) =>
                setTempFastfoodData((prev) => ({
                  ...prev,
                  time: e.target.value,
                }))
              }
              min={minDate}
            />
            {!!fastfoodErrors.time && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {fastfoodErrors.time}
              </Typography>
            )}

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Venue to give
            </Typography>
            <TextField
              value={tempFastfoodData.venue || ""}
              onChange={(e) =>
                setTempFastfoodData((prev) => ({
                  ...prev,
                  venue: e.target.value,
                }))
              }
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
            {!!fastfoodErrors.venue && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {fastfoodErrors.venue}
              </Typography>
            )}

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
                value={tempFastfoodData.quantity || 0}
                onChange={handleSliderChange}
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ marginRight: 2 }} // Added space between slider and buttons
              />
              <div className="spbuttonsicon" onClick={handleRemove}>
                <RemoveIcon />
              </div>
              <TextField
                value={tempFastfoodData.quantity}
                size="small"
                sx={{ width: 85, marginRight: 1, marginLeft: 1 }}
                InputProps={{
                  readOnly: true,
                }}
                error={!!fastfoodErrors.quantity}
                helperText={fastfoodErrors.quantity}
              />

              <div className="spbuttonsicon" onClick={handleAdd}>
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
    { id: "car", image: "/images/car.png" },
    { id: "soup", image: "/images/soup.png" },
    { id: "fastfood", image: "/images/fastfood.png" },
    { id: "add", icon: <AddIcon sx={{ fontSize: 40, color: "#03a9f4" }} /> },
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
          <div onClick={handleClose} className="spbuttons">
            Cancel
          </div>
          <div onClick={handleSubmit} className="spbuttons">
            Confirm
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpecialRequest;
