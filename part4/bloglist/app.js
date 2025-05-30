require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

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

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
