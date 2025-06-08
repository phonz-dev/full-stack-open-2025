require("dotenv").config()
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing")

const app = express();

const connectToDb = async () => {
	try {
		await mongoose.connect(config.MONGODB_URI);
		logger.info("connected to MongoDB");
	} catch (error) {
		logger.error(`error connecting to MongoDB ${error.message}`);
	}
};

connectToDb()

app.use(express.json());
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
	app.use("/api/tests", testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app;
