const express = require("express");
const mongoose = require("mongoose");

// Routes
const userRoute = require("./routes/user.route");

mongoose
  .connect(
    "mongodb+srv://devSubham07:6IcsOXuF8Y3X3BUV@cluster0.8eltigl.mongodb.net/users?appName=Cluster0",
  )
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
