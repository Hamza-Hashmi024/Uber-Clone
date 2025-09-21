const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const app = require("./app");
const cors = require("cors");
const Port = process.env.PORT || 3000;

app.use(cors());

const server = http.createServer(app);

server.listen(Port, () => {
  console.log(`Server is Running on ${Port}`);
});
