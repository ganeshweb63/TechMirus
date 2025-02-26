const express = require("express");
const { printLog, LogType, LogColor } = require("./utils/logger");

const app = express();
const port = 8080;

app.use("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  printLog(`Server listening on ${port}`, {
    color: LogColor.blue,
    logType: LogType.database,
  });
});
