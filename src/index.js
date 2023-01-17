const appRoot = require("app-root-path");
const path = require("path");
const cors = require("cors");
const { serverInstance, app, express } = require("./components/socket.io");

const publicRouter = express.static(path.join(appRoot.path, "public"));
const webhookRouter = require("./routers/webhook/");
const signInRouter = require("./routers/signIn");
const usersRouter = require("./routers/users");
const messagesRouter = require("./routers/messages");
require("dotenv").config();

(async () => {
  try {
    const { API_PORT } = process.env;
    const PORT = API_PORT || 8000;
    app.use(cors());
    app.use(express.json());

    app.use("/users", usersRouter);
    app.use("/public", publicRouter);
    app.use("/signIn", signInRouter);
    app.use("/webhook", webhookRouter);
    app.use("/messages", messagesRouter);

    app.use((error, req, res, next) => {
      error.response ? console.log(error.message) : console.log({ error });
      error.errorMessage ? "" : (error.errorMessage = error.message);

      const errorObj = {
        status: "Error",
        message: error.errorMessage,
        detail: error.response ? error.response.data : error,
      };

      const httpCode = typeof error.code == "number" ? error.code : 500;
      res.status(httpCode).send(errorObj);
    });

    serverInstance.listen(PORT, (error) => {
      if (error) {
        console.log(`ERROR: ${error}`);
      } else {
        console.log(`SERVER RUNNING at ${PORT} ✅`);
      }
    });
  } catch (error) {
    console.log({ error });
  }
})();
