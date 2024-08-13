const mongoose = require("mongoose");

// define package schema
const packageSchema = mongoose.Schema({
	name: { type: String, required: true },
	trackingNumber: { type: String, required: true },
	courier: { type: String, required: true },
	imgIndex: { type: Number, required: true },
	owner: { type: String, required: true },
	archived: { type: Boolean, required: true },
	info: {
		dateCreated: {type: Date, default: Date.now}
	}
});

const Package = mongoose.model("package", packageSchema);

// find one package
const findOwnerPackage = async (owner, trackingNumber) => {
	const foundPackage = await Package.find({
		owner: owner,
		trackingNumber: trackingNumber,
	})
	
	if (foundPackage.length > 0) {
		return true;
	}
	
	return false;
};

// find one package by id
const findPackageByID = async (id) => {
	const result = await Package.findById(id);
	if (result !== null) {
		return result;
	}
	return false;
};

// find all owner packages
const findAllOwnerPackages = async (owner, isArchive) => {
	const foundPackages = await Package.find({
		$or: [
			{ owner: owner, archived: isArchive ? true : false },
			{ owner: owner, archived: isArchive ? true : undefined },
		],
	}).sort({"info.dateCreated": -1})
	return foundPackages;
};

// create a package
const createPackage = async (name, trackingNumber, courier, owner) => {
	const newPackageData = {
		name: name,
		trackingNumber: trackingNumber,
		courier: courier,
		imgIndex: 0,
		owner: owner,
		archived: false,
	};

	const newPackage = Package(newPackageData);
	return newPackage.save();
};

// find and update a package
const findAndUpdatePackage = async (id, name, trackingNumber, courier) => {
	const updateData = {
		name: name,
		trackingNumber: trackingNumber,
		courier: courier,
	};

	const result = await Package.findByIdAndUpdate(id, updateData);
	if (result !== null) {
		return result;
	}

	return false;
};

// find and update image index of package
const findAndUpdateImgIndex = async (id, index) => {
	const result = await Package.findByIdAndUpdate(id, { imgIndex: index });
	if (result !== null) {
		return result;
	}
	return false;
};

// find and delete a package
const findAndDeletePackage = async (owner, trackingNumber) => {
	const deletePackage = await Package.deleteOne({
		owner: owner,
		trackingNumber: trackingNumber,
	});

	return deletePackage;
};

// update archived status
const updateIsArchived = async (id, isArchived) => {
	const result = await Package.findByIdAndUpdate(id, { archived: isArchived });

	if (result !== null) {
		return result;
	}

	return false;
};

module.exports = {
	Package,
	findOwnerPackage,
	findPackageByID,
	findAllOwnerPackages,
	createPackage,
	findAndUpdatePackage,
	findAndUpdateImgIndex,
	findAndDeletePackage,
	updateIsArchived,
};
