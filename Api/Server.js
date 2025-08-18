const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is up");
});
