const chalk = require("chalk");

/**
 * Logs a message with an optional log type.
 *
 * @param {string} message - The message to log.
 * @param {Object} options - TAG for logging.
 * @param {string} [options.logType=""] - The type of log (e.g., `LogType.database` or `LogType.user`).
 * @param {Function} [options.color=LogColor.white] - The chalk color function to apply.
 */
function printLog(
  message,
  options = {
    logType: LogType.unknown,
    color: LogColor.white,
  }
) {
  const logger = console.log;
  logger(
    options.color(`${options.logType ? `[${options.logType}] ` : ""}${message}`)
  );
}
/**
 * Enum for log types.
 * @readonly
 * @enum {string}
 */
class LogType {
  static unknown = "APP";
  static database = "DATABASE";
  static user = "USER";
}

/**
 * Enum for log colors.
 * @readonly
 * @enum {Function}
 */
class LogColor {
  static white = chalk.white;
  static red = chalk.red;
  static green = chalk.green;
  static blue = chalk.blue;
  static yellow = chalk.yellow;
  static cyan = chalk.cyan;
}
module.exports = { printLog, LogType, LogColor };
