const dotenv = require("dotenv");
dotenv.config();
const http = require("http");

const app = require("./app");
const cors = require("cors");
const Port = process.env.PORT || 3000;
const connectToDb = require("./db/db");

app.use(cors());
connectToDb();


const server = http.createServer(app);

server.listen(Port, () => {
  console.log(`Server is Running on ${Port}`);
});
