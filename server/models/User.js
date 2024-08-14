const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	email: { type: String, required: true },
	name: { type: String, required: true },
	password: { type: String, required: true },
	info: {
		dateCreated: {type: Date, default: Date.now}
	}
});

const User = mongoose.model("User", userSchema);

// find user by email
const findUserByEmail = async (email) => {
	const foundUser = await User.findOne({
		email: email.toLowerCase(),
	});
	return foundUser;
};

// find user by id
const findUserById = async (id) => {
	const foundUser = await User.findById({_id: id})
	return foundUser
}

// create a user
const createUser = async (email, name, password) => {
	const newUserData = {
		email: email.toLowerCase(),
		name: name,
		password: password,
	};
	const newUser = new User(newUserData);
	return newUser.save();
};

module.exports = {
	findUserByEmail,
	findUserById,
	createUser,
};
