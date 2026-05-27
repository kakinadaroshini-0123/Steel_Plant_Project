require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/auth", require("./routes/authRoutes"));
app.use("/", require("./routes/employeeRoutes"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/role.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
