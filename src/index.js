const express = require("express");
const { printLog, LogType, LogColor } = require("./utils/logger");
const { connectToDB } = require("./services/database");
const app = express();
const EmployeeRoutes = require("./routes/employeeRoutes");
const AuthRoutes = require("./routes/authRoutes");
const { printRequestRoute } = require("./middlewares/employee");
const cookieParser = require("cookie-parser");
const port = 8000;
app.use(express.json());
app.use(cookieParser());
app.use(printRequestRoute);
app.use(EmployeeRoutes);
app.use(AuthRoutes);

app.use("/", (req, res) => {
  res.send("Hello");
});

connectToDB()
  .then((val) => {
    printLog(`Database connected successfully!`, {
      color: LogColor.blue,
      logType: LogType.database,
    });
    app.listen(port, () => {
      printLog(`Server listening on ${port}`, {
        color: LogColor.yellow,
      });
    });
  })
  .catch((error) => {
    printLog(`Database connection error :: ${error}`, { color: LogColor.red });
  });
