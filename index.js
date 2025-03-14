const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const dmRoutes = require("./routes/dmRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/dms", dmRoutes);

app.get("/", (req, res) => {
  res.send("Hello linkedin dm");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
