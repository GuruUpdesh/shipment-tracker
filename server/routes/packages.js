const express = require("express");
const router = express.Router();
const user_model = require("../models/User");
const model = require("../models/Package");
const { parseData } = require("../utility");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
	const jwtTokenHeader = req.headers.authorization;
	const { id } = req.body;

	try {
		if (!jwtTokenHeader || id === undefined) {
			console.log(req.headers);
			return res.status(401).json("you need to Login");
		}

		const token = jwtTokenHeader.split(" ")[1];

		let foundUser;

		try {
			foundUser = await user_model.findUserById(req.body.id);

			if (!foundUser) {
				return res.status(401).json("invalid user id");
			}
		} catch (error) {
			return res.status(401).json("invalid user id");
		}

		const decrypt = await jwt.verify(token, `${process.env.SECRET}`);

		if (new Date().getTime() >= decrypt.exp) {
			return res.status(401).json("token is expired");
		}

		if (id === decrypt.id && foundUser.email === decrypt.email) {
			next();
			return;
		}

		return res.status(401).json("invalid token");
	} catch (error) {
		return res.status(500).json(error.toString());
	}
};

router.post("/authenticate", verifyJWT, (req, res) => {
	res.status(200).send("authentic");
});

// handle create a package
router.put("/add", verifyJWT, async (req, res) => {
	try {
		// find user with email
		const foundUser = await user_model.findUserByEmail(req.body.email);
		console.log(foundUser);
		if (!foundUser) {
			return res.status(400).json({ message: "User not found" });
		}

		// determine if package has already been created
		const foundPackage = await model.findOwnerPackage(
			foundUser.id,
			req.body.trackingNumber
		);
		if (foundPackage) {
			return res
				.status(400)
				.json({ message: "Package has already been created" });
		}

		// add package
		const newPackage = await model.createPackage(
			req.body.name,
			req.body.trackingNumber,
			req.body.courier,
			foundUser.id
		);

		// if package is added
		if (newPackage) {
			return res
				.status(201)
				.json({ message: "Package Created!", packageData: newPackage });
		}

		return res.status(400).json({
			message: "There was a problem when trying to create a package",
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({ Error: "Request failed" });
	}
});

// handle getting all packages
router.post("/packages-data", verifyJWT, async (req, res) => {
	try {
		// find user with email
		const foundUser = await user_model.findUserByEmail(req.body.email);
		if (!foundUser) {
			return res.status(400).json({ message: "User not found" });
		}

		// get package data
		const foundPackages = await model.findAllOwnerPackages(
			foundUser.id,
			req.body.archive
		);
		if (foundPackages) {
			return res.status(200).json(foundPackages);
		}
		return res.status(400).json({ message: "Failed to find packages" });
	} catch (error) {
		console.error(error);
		return res.status(400).json({ Error: "Request failed" });
	}
});

// handle update package
router.post("/update", verifyJWT, async (req, res) => {
	try {
		// determine if package exists
		const foundPackage = await model.findPackageByID(req.body.packageId);
		if (!foundPackage) {
			return res.status(400).json({ message: "package not found" });
		}

		// find and update package
		const result = await model.findAndUpdatePackage(
			req.body.packageId,
			req.body.name,
			req.body.trackingNumber,
			req.body.courier
		);
		if (result) {
			return res.status(200).json({ message: "updated", result: result });
		}
		return res.status(400).json({ message: "could not find package" });
	} catch (error) {
		console.error(error);
		return res.status(400).json({ Error: "Request failed" });
	}
});

router.post("/update-archived", verifyJWT, async (req, res) => {
	try {
		const result = await model.updateIsArchived(
			req.body.packageId,
			req.body.isArchived
		);

		if (result) {
			return res.status(200).json({ message: "updated", result: result });
		}

		return res.status(400).json({ message: "could not find package" });
	} catch (error) {
		console.error(error);
		return res.status(400).json({ Error: "Request failed" });
	}
});

// handle delete package
router.delete("/delete", verifyJWT, async (req, res) => {
	try {
		// delete package
		const deletePackage = await model.findAndDeletePackage(
			req.body.id,
			req.body.trackingNumber
		);

		// is a package was deleted
		if (deletePackage.deletedCount === 1) {
			return res.status(200).json({ message: "package was deleted" });
		}

		return res
			.status(400)
			.json({ message: "problem when trying to delete package" });
	} catch (error) {
		console.error(error);
		return res.status(400).json({ Error: "Request failed" });
	}
});

router.post("/update-img-index", async (req, res) => {
	try {
		console.log(req.body);
		// find index
		let index = req.body.index;
		if (index === undefined || req.body.packageId === undefined) {
			return res.status(400).send("bad request");
		}
		if (index > 9) {
			let index = index % 9;
		}

		// update index
		const result = await model.findAndUpdateImgIndex(
			req.body.packageId,
			index
		);
		if (result) {
			return res.status(200).json({ message: "updated" });
		}
		return res.status(400).json({ message: "could not find package" });
	} catch (error) {
		console.error(error);
		res.status(400).json({ Error: "Request failed" });
	}
});

router.post("/package-tracking-data", verifyJWT, async (req, res) => {
	try {
		// find package by id
		const foundPackage = await model.findPackageByID(req.body.packageId);

		if (foundPackage === null) {
			console.error("could not find package");
			return res.status(400).json({ message: "could not find package" });
		}

		// send api request
		const courier = foundPackage.courier.toLowerCase();
		const trackingNumber = foundPackage.trackingNumber;

		const packageAPIInfo = await axios
			.get(
				`https://api.goshippo.com/tracks/${courier}/${trackingNumber}`,
				{
					headers: {
						Authorization: process.env.SHIPPO_TOKEN,
					},
				}
			)
			.catch((error) => {
				console.error(error, "could not load API data");
			});

		if (packageAPIInfo.status !== 200) {
			return res.status(400).json({ message: "API call failed" });
		}

		let parsedData = {};
		parsedData = parseData(packageAPIInfo.data);

		const locationObj = parsedData.header.location;
		const location = `${locationObj.city}, ${locationObj.state} ${locationObj.zip} ${locationObj.country}`;
		const googleKey = process.env.GOOGLE_KEY;
		const latLngData = await axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${location}}&key=${googleKey}`
		);
		const latLng = {};

		// if the response status is OK return the lat and lng
		if (latLngData.data.status === "OK") {
			latLng.lat = latLngData.data.results[0].geometry.location.lat;
			latLng.lng = latLngData.data.results[0].geometry.location.lng;
		} else {
			return res.status(400).json({
				message:
					"there was a problem when trying to get the location of package from google api",
			});
		}

		// get images
		const urls = [];
		const imagesResponse = await axios.get(
			`https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_CLIENT}&query=${foundPackage.name}`
		);
		const photoObjects = imagesResponse.data.results;

		photoObjects.forEach((photo) => {
			urls.push(photo.urls.regular);
		});

		if (urls.length == 0) {
			// return res.status(400).json({
			// 	message: "there was a problem when trying to get images",
			// });
			urls.push(
				"https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
			);
		}

		parsedData.header.photos = urls;
		parsedData.header.coordinates = latLng;
		parsedData.header.courier = courier;
		parsedData.header.trackingNumber = trackingNumber;
		parsedData.header.name = foundPackage.name;
		parsedData.header.id = foundPackage.id;
		parsedData.header.imgIndex = foundPackage.imgIndex;

		return res.status(200).json(parsedData);
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: "Request failed" });
	}
});

module.exports = router;
