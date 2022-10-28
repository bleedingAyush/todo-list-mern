const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const server = require("http").createServer(app);
const routes = require("./routes");
const supertokens = require("supertokens-node");
const { middleware } = require("supertokens-node/framework/express");
const connectDB = require("./config/db");
const initializeSuperToken = require("./config/supertokens");

dotenv.config();
app.use(express.json());

connectDB();
initializeSuperToken();

app.use(
  cors({
    origin: `${process.env.WEBSITE_DOMAIN}`,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());

app.use("/", routes);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
