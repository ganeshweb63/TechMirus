const { printLog, LogColor } = require("./logger");
const StatusCode = require("./statusCodes");

/**
 *
 * @param {*} error
 * @returns Json String Object Error
 */
const buildErrorResponse = (error) => {
  return JSON.stringify({
    error: error,
  });
};

/**
 *
 * @param {object} res Response Object
 * @param {string} error Error Message
 * @param {{statusCode:string}} options other options
 */
const sendErrorResponse = async (
  res,
  error,
  options = { statusCode: StatusCode.badRequest }
) => {
  const errorMessage = buildErrorResponse(error);
  printLog(`[Route: ${res.req.originalUrl}] : ${errorMessage}`, {
    color: LogColor.red,
  });
  res.status(options.statusCode);
  await res.send(errorMessage);
};

module.exports = { buildErrorResponse, sendErrorResponse };
