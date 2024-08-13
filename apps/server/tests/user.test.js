const app = require("../server");
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeAll((done) => {
	mongoose.connect(
		"mongodb+srv://admin:9G87USyd!@freemongocluster.z7vd5.mongodb.net/shippingAPITest?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => done()
	);
});

afterAll((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

test("Register a valid account", async () => {
	await supertest(app)
		.post("/api/register")
		.send({
			email: "test_email@tests.com",
			name: "test",
			password: "123",
		})
		.expect(201);
});

test("Register an account with existing email", async () => {
	await supertest(app)
		.post("/api/register")
		.send({
			email: "test_email@tests.com",
			name: "test",
			password: "123",
		})
		.expect(400);
});

test("Login", async () => {
	await supertest(app)
		.post("/api/login")
		.send({
			email: "test_email@tests.com",
			password: "123",
		})
		.expect(200)
});

test("Invalid password login", async () => {
	await supertest(app)
		.post("/api/login")
		.send({
			email: "test_email@tests.com",
			password: "1234",
		})
		.expect(400)
});

test("Invalid email login", async () => {
	await supertest(app)
		.post("/api/login")
		.send({
			email: "test_email@tests.co",
			password: "123",
		})
		.expect(400)
});


