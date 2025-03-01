const express = require("express");
const { signUp, logout, login } = require("../controllers/auth_controller");
const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

module.exports = authRouter;
