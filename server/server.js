const express = require("express");
const users = require("./routes/users");
const packages = require("./routes/packages");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
mongoose
	.connect(process.env.MONGO_DB_CONNECTION_STRING, {
		serverApi: {
			version: "1",
			strict: true,
			deprecationErrors: true,
			strictQuery: true,
		},
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log("Server has started!");
		});
	});

const app = express();

app.use(
	cors({
		credentials: true,
		origin: [
			`${process.env.FRONT_URL}`
		],
	})
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", users);
app.use("/api", packages);

app.get("/", (req, res) => res.send("hello world"));

module.exports = app;
