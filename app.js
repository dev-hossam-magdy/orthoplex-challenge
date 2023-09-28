const express = require("express");

const app = express();
var cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(helmet());

const userRouter = require("./routers/user");
const logsRouter = require("./routers/logs");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,authorization,Accept-Language,X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "*");
    // res.header("Access-Control-Allow-Methods",'Put,Post,Patch,Delete,Get,put');
    return res.status(200).json({});
  }

  next();
});

app.all("*", logsRouter);
app.use("/api/user", userRouter);

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  console.log(error);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  //if(error)	throw error;
  console.log(error);
  if (error.status == 404)
    res.json({
      error: {
        message: `not found 404`,
      },
    });
  // console.log(error);
  else
    res.json({
      error: {
        massage: "app crash",
        err: error.massage,
      },
    });
});

module.exports = app;
