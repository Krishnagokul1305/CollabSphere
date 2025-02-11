const express = require("express");
const { Server } = require("socket.io");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const errorHandler = require("./app/utils/ErrorHandler.js");

const authRouter = require("./app/features/auth/auth.route.js");
const userRouter = require("./app/features/users/user.route.js");
const morgan = require("morgan");
const AppError = require("./app/utils/AppError.js");

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("*", (req, res, next) => {
  return next(new AppError("no routes found for the request", 404));
});

app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`🚀 REST API server running at http://localhost:${port}`);
});
