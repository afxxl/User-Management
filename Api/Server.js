const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const path = require("path");
const multer = require("multer");
const adminRouter = require("./routes/admin");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes("Only image")) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

app.listen(process.env.PORT, () => {
  console.log("Server is up");
});
