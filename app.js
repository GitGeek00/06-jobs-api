require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// MongoDB connection
const connectDB = require("./db/connect");

// for cors
const cors = require("cors");
app.use(cors());

// Authenticate middleware
const authenticate = require("./middleware/authentication");

// Routes
const authRouter = require("./routes/auth.js");
const olympicRouter = require("./routes/olympic");
const profileRouter = require("./routes/profile");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// for req.body
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/olympic", olympicRouter);
app.use("/api/v1/profile", authenticate, profileRouter);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();