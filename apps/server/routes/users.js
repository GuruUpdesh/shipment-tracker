const express = require("express");
const router = express.Router();
const model = require("../models/User");
const { hashPassword, verifyPassword } = require("../utility");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

router.post("/register", async (req, res) => {
	try {
		// determine if email has already been used
		const foundUser = await model.findUserByEmail(req.body.email);
		if (foundUser) {
			return res.status(400).json({ message: "Email already exists" });
		}

		// create the account
		const hashedPassword = await hashPassword(req.body.password); // hash password
		const user = await model.createUser(req.body.email, req.body.name, hashedPassword);
		if (user) {
			return res.status(201).json({
				message: "User Created!",
				userData: { id: user._id, email: user.email, name: user.name },
			});
		}
		return res.status(400).json({
			message: "There was a problem creating your account",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({ Error: "Request failed" });
	}
});

router.post("/register/google", async (req, res) => {
	try {
		// get user info
		const { token } = req.body;

		if (!token) {
			return res.status(400);
		}

		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID,
		});

		const { name, sub, email } = ticket.getPayload();

		// determine if email has already been used
		const foundUser = await model.findUserByEmail(email);
		if (foundUser) {
			return res.status(400).json({ message: "Email already exists" });
		}

		// create the account
		const hashedPassword = await hashPassword(sub); // hash password
		const user = await model.createUser(email, name, hashedPassword);
		if (user) {
			return res.status(201).json({
				message: "User Created!",
				userData: { id: user._id, email: user.email, name: user.name },
			});
		}
		return res.status(400).json({
			message: "There was a problem creating your account",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({ Error: "Request failed" });
	}
});

// handle login
router.post("/login", async (req, res) => {
	try {
		// find user with email
		const foundUser = await model.findUserByEmail(req.body.email);
		if (!foundUser) {
			return res.status(400).json({ message: "Email or password is incorrect" });
		}

		// validate
		const validate = await verifyPassword(req.body.password, foundUser.password).then((result) => {
			if (result) {
				const id = foundUser.id;
				return res.status(200).json({
					message: "Authentication successful!",
					userData: { email: req.body.email, id: foundUser.id },
				});
			}
			// if validation fails
			return res.status(400).json({ message: "Email or password is incorrect" });
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({ Error: "Request failed" });
	}
});

// const generateToken = async (id, remember, res) => {
// 	const token = jwt.sign({ id }, `${process.env.SECRET}`, {});
// 	if (remember === "0") {
// 		res.status(304)
// 			.cookie("jwt", token, {
// 				httpOnly: true,
// 				secure: true,
// 				sameSite: "none",
// 			})
// 			.json({ success: true, token });

// 		return;
// 	}
// 	res.status(304)
// 		.cookie("jwt", token, {
// 			expires: new Date(new Date().getTime() + 5 * 1000 * 3600),
// 			httpOnly: true,
// 			secure: true,
// 			sameSite: "none",
// 		})
// 		.json({ success: true, token });
// };

router.post("/cookie", async (req, res) => {
	try {
		// return generateToken(req.query.id, req.query.remember, res);
		const { id, email } = req.body;
		const jwtToken = jwt.sign(
			{ id, email, exp: new Date().setMonth(new Date().getMonth() + 1), iss: "shipmentracker" },
			`${process.env.SECRET}`
		);
		console.log(jwtToken);

		return res.status(200).json({ jwtToken });
	} catch (error) {
		return res.status(400);
	}
});

router.get("/logout", async (req, res) => {
	try {
		console.log(req.query);
		res.status(304)
			.cookie("jwt", "none", {
				expires: new Date(new Date().getTime() + 1000),
				httpOnly: true,
				secure: true,
				sameSite: "none",
			})
			.json({ success: true, token: "none" });

		return;
	} catch (error) {
		return res.status(400);
	}
});

router.post("/auth/google", async (req, res) => {
	try {
		const { token } = req.body;

		if (!token) {
			return res.status(400);
		}

		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID,
		});

		const { name, email } = ticket.getPayload();

		const foundUser = await model.findUserByEmail(email);
		if (!foundUser) {
			return res.status(400).json({ message: "Email or password is incorrect" });
		}

		return res.status(200).json({ message: "Authentication successful!", userData: { email: email, id: foundUser.id } });
	} catch (error) {
		return res.status(400).json({ message: `${error}` });
	}
});

module.exports = router;
