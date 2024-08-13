const app = require("../server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const model = require("../models/Package");

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

// add test account
test("Register test account", async () => {
	await supertest(app).post("/api/register").send({
		email: "test_email@tests.com",
		name: "test",
		password: "123",
	});
});

test("Create package", async () => {
	await supertest(app)
		.put("/api/add")
		.send({
			email: "test_email@tests.com",
			name: "test",
			trackingNumber: "1Z89Y9F00396331944",
			courier: "UPS",
		})
		.expect(201);
});

test("Get all packages", async () => {
	await supertest(app)
		.post("/api/packages-data")
		.send({
			email: "test_email@tests.com",
		})
		.expect(200)
		.then((response) => {
			// Check type and length
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length).toEqual(1);

			// Check data
			expect(response.body[0].name).toBe("test");
			expect(response.body[0].trackingNumber).toBe("1Z89Y9F00396331944");
			expect(response.body[0].courier).toBe("UPS");
		});
});

test("Update package", async () => {
	let id;
	// get package id
	await supertest(app)
		.post("/api/packages-data")
		.send({
			email: "test_email@tests.com",
		})
		.then((response) => {
			id = response.body[0]._id;
		});

	await supertest(app)
		.post("/api/update")
		.send({
			id: id,
			email: "test_email@tests.com",
			name: "updated name",
			trackingNumber: "1Z89Y9F00396331944",
			courier: "UPS",
		})
		.expect(200);

	const updated = await model.Package.findById(id);
	expect(updated.name).toBe("updated name");
});

test("Delete package", async () => {
	await supertest(app)
		.delete("/api/delete")
		.send({
			email: "test_email@tests.com",
			trackingNumber: "1Z89Y9F00396331944",
		})
		.expect(200);

	await supertest(app)
		.post("/api/packages-data")
		.send({
			email: "test_email@tests.com",
		})
		.expect(200)
		.then((response) => {
			// Check type and length
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length).toEqual(0);
		});
});

test("Get package data", async () => {
	let id;
	await supertest(app)
		.put("/api/add")
		.send({
			email: "test_email@tests.com",
			name: "test",
			trackingNumber: "1Z89Y9F00396331944",
			courier: "UPS",
		})
		.expect(201)
		.then((response) => {
			id = response.body.packageData._id
		})

	await supertest(app)
	.post("/api/package-tracking-data")
	.send({
		id: id
	})
	.expect(200)
});
