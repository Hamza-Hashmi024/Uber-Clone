const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const http = require("http");
const app = require("./app");
const cors = require("cors");
const Port = process.env.PORT || 3000;
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const UserRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");


app.use(cors());
connectToDb();
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", UserRoutes);
app.use("/api/captains", captainRoutes);

server.listen(Port, () => {
  console.log(`Server is Running on ${Port}`);
});
