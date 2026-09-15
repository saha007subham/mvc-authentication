const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Custom Middlewares
const { ensureAuthenticated } = require("./middlewares/auth.middleware");

// Routes
const userRoute = require("./routes/user.route");

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB is connected."))
  .catch((err) => {
    console.log("Error connecting MongoDB.");
    throw err;
  });

// Constants
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Success.." });
});

app.use("/users", userRoute);

// Config
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
