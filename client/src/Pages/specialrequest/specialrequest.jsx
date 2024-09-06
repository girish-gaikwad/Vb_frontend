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

    if (!tempSoupData.preferred_food) {
      errors.preferred_food = "Preferred food is required.";
    }
    if (!tempSoupData.time) {
      errors.time = "Time is required.";
    }
    if (!tempSoupData.to_venue) {
      errors.to_venue = "Venue is required.";
    }
    if (tempSoupData.food_quantity === 0) {
      errors.food_quantity = "required";
    }

    setSoupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCarData = () => {
    const errors = {};

    if (!tempCarData.car_count) {
      errors.car_count = "required";
    }
    if (!tempCarData.arrival_at) {
      errors.arrival_at = "Arrival time is required.";
    }
    if (!tempCarData.depature_at) {
      errors.depature_at = "Departure time is required.";
    }
    if (!tempCarData.car_type) {
      errors.car_type = "Vehicle type is required.";
    }

    setCarErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateFastfoodData = () => {
    const errors = {};

    if (!tempFastfoodData.refreshment_dish) {
      errors.refreshment_dish = "Preferred refreshment is required.";
    }
    if (!tempFastfoodData.time) {
      errors.time = "Time is required.";
    }
    if (!tempFastfoodData.to_venue) {
      errors.to_venue = "Venue is required.";
    }
    if (tempFastfoodData.quantity === 0) {
      errors.quantity = "required";
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
        setSoupData({ ...tempSoupData, food_request_status: 1 });
        break;
      case "car":
        setCarData({ ...tempCarData, car_request_status: 1 });
        break;
      case "fastfood":
        setFastfoodData({ ...tempFastfoodData, refreshment_request_status: 1 });
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
        setTempSoupData((prev) => ({ ...prev, food_quantity: newValue }));
        break;
      case "car":
        setTempCarData((prev) => ({ ...prev, car_count: newValue }));
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
          food_quantity: Math.min(prev.food_quantity + 1, 100),
        }));
        break;
      case "car":
        setTempCarData((prev) => ({
          ...prev,
          car_count: Math.min(prev.car_count + 1, 100),
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
          food_quantity: Math.max(prev.food_quantity - 1, 0),
        }));
        break;
      case "car":
        setTempCarData((prev) => ({
          ...prev,
          car_count: Math.max(prev.car_count - 1, 0),
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

  const getDialogContent = () => {
    switch (selectedBox) {
      case "soup":
        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Preferred food
            </Typography>
            <TextField
              value={tempSoupData.preferred_food || ""}
              onChange={(e) =>
                setTempSoupData((prev) => ({
                  ...prev,
                  preferred_food: e.target.value,
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
              sx={{ marginBottom: 2 }}
              error={!!soupErrors.preferred_food}
              helperText={soupErrors.preferred_food}
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
              value={tempSoupData.to_venue || ""}
              onChange={(e) =>
                setTempSoupData((prev) => ({
                  ...prev,
                  to_venue: e.target.value,
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
              sx={{ marginBottom: 2 }}
              error={!!soupErrors.to_venue}
              helperText={soupErrors.to_venue}
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
                value={tempSoupData.food_quantity || 0}
                onChange={handleSliderChange}
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ marginRight: 2 }}
                error={!!soupErrors.food_quantity}
                helperText={soupErrors.food_quantity}
              />
              <div className="spbuttonsicon" onClick={handleRemove}>
                <RemoveIcon />
              </div>
              <TextField
                value={tempSoupData.food_quantity}
                size="small"
                sx={{ width: 85, marginRight: 1, marginLeft: 1 }}
                InputProps={{
                  readOnly: true,
                }}
                error={!!soupErrors.food_quantity}
                helperText={soupErrors.food_quantity}
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
                value={tempCarData.car_count || 0}
                onChange={handleSliderChange}
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ marginRight: 2 }} // Added space between slider and buttons
                error={!!carErrors.car_count}
                helperText={carErrors.car_count}
              />
              <div className="spbuttonsicon" onClick={handleRemove}>
                <RemoveIcon />
              </div>
              <TextField
                value={tempCarData.car_count || 0}
                size="small"
                sx={{ width: 90, marginRight: 1, marginLeft: 1 }}
                InputProps={{
                  readOnly: true,
                }}
                error={!!carErrors.car_count}
                helperText={carErrors.car_count}
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
              value={tempCarData.arrival_at || ""}
              onChange={(e) =>
                setTempCarData((prev) => ({
                  ...prev,
                  arrival_at: e.target.value,
                }))
              }
              min={minDate}
            />
            {!!carErrors.arrival_at && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {carErrors.arrival_at}
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
              value={tempCarData.depature_at || ""}
              onChange={(e) =>
                setTempCarData((prev) => ({
                  ...prev,
                  depature_at: e.target.value,
                }))
              }
              min={minDate}
            />
            {!!carErrors.depature_at && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {carErrors.depature_at}
              </Typography>
            )}

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Vehicle Type
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="car-select-label">Select Car</InputLabel> */}
              <Select
                labelId="car-select-label"
                value={tempCarData.car_type || ""}
                onChange={(e) =>
                  setTempCarData((prev) => ({
                    ...prev,
                    car_type: e.target.value,
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

            {!!carErrors.car_type && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {carErrors.car_type}
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
              value={tempFastfoodData.refreshment_dish || ""}
              onChange={(e) =>
                setTempFastfoodData((prev) => ({
                  ...prev,
                  refreshment_dish: e.target.value,
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
              error={!!fastfoodErrors.refreshment_dish}
              helperText={fastfoodErrors.refreshment_dish}
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
              value={tempFastfoodData.to_venue || ""}
              onChange={(e) =>
                setTempFastfoodData((prev) => ({
                  ...prev,
                  to_venue: e.target.value,
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
            {!!fastfoodErrors.to_venue && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {fastfoodErrors.to_venue}
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
                error={!!fastfoodErrors.quantity}
                helperText={fastfoodErrors.quantity}
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
    { id: "car", image: "/img/car.png" },
    { id: "soup", image: "/img/soup.png" },
    { id: "fastfood", image: "/img/fastfood.png" },
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
          <button onClick={handleClose} className="spbuttons">
            Cancel
          </button>
          <button onClick={handleSubmit} className="spbuttons">
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpecialRequest;
