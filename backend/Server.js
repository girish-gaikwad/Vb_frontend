const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


const GetRoutes = require("./routes/GetRoutes");
const PostRoutes = require("./routes/PostRoutes");
const putRoutes=require("./routes/PutRoutes");


app.use("/get", GetRoutes);
app.use("/post", PostRoutes);
app.use('/put', putRoutes);


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res
    .status(500)
    .json({ error: "Internal Server Error", details: err.message });
});

app.get("/", (req, res) => {
  res.send("hi");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});