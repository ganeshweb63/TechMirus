const { printLog, LogColor } = require("../utils/logger");

const printRequestRoute = (req, res, next) => {
  printLog(`[${new Date()}] New Request : ${req.originalUrl}`, {
    color: LogColor.cyan,
  });
  next();
};

module.exports = { printRequestRoute };
