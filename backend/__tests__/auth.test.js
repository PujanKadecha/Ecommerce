const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user.model");

// ─── Test DB Setup ────────────────────────────────────────────────────────────

beforeAll(async () => {
  const testDbUrl =
    process.env.MONGO_URI_TEST || "mongodb://localhost:27017/ecommerce_test";
  await mongoose.connect(testDbUrl);
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const validUser = {
  firstName: "Test",
  lastName: "User",
  email: "testuser@example.com",
  password: "Password1@",
};

const registerUser = (data = validUser) =>
  request(app).post("/api/v1/auth/register").send(data);

const registerAndLogin = async (data = validUser) => {
  await registerUser(data);
  const res = await request(app)
    .post("/api/v1/auth/login")
    .send({ email: data.email, password: data.password });
  return res.body.data; // { user, accessToken, refreshToken }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/auth/register
// ─────────────────────────────────────────────────────────────────────────────

describe("POST /api/v1/auth/register", () => {
  it("should register a new user, return 201, not expose password, and set default role", async () => {
    const res = await registerUser();

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(validUser.email);
    expect(res.body.data).not.toHaveProperty("password"); // security check
    expect(res.body.data.role).toBe("customer"); // default role
  });

  it("should return 409 for a duplicate email", async () => {
    await registerUser();
    const res = await registerUser(); // second attempt

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it("should return 400 for invalid input (bad password format)", async () => {
    const res = await registerUser({ ...validUser, password: "weak" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/auth/login
// ─────────────────────────────────────────────────────────────────────────────

describe("POST /api/v1/auth/login", () => {
  it("should login and return 200 with accessToken and refreshToken (no password)", async () => {
    await registerUser();

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: validUser.email, password: validUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("accessToken");
    expect(res.body.data).toHaveProperty("refreshToken");
    expect(res.body.data.user).not.toHaveProperty("password"); // security check
  });

  it("should return 401 for wrong credentials", async () => {
    await registerUser();

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: validUser.email, password: "WrongPass1@" });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/auth/refresh
// ─────────────────────────────────────────────────────────────────────────────

describe("POST /api/v1/auth/refresh", () => {
  it("should return a new accessToken for a valid refreshToken", async () => {
    const { refreshToken } = await registerAndLogin();

    const res = await request(app)
      .post("/api/v1/auth/refresh")
      .send({ refreshToken });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("accessToken");
  });

  it("should return 4xx for a missing or invalid refreshToken", async () => {
    const res = await request(app).post("/api/v1/auth/refresh").send({});

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body.success).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/auth/logout
// ─────────────────────────────────────────────────────────────────────────────

describe("POST /api/v1/auth/logout", () => {
  it("should logout and remove the refreshToken from the DB", async () => {
    const { refreshToken } = await registerAndLogin();

    const res = await request(app)
      .post("/api/v1/auth/logout")
      .send({ refreshToken });

    expect(res.statusCode).toBe(200);

    const userInDb = await User.findOne({ email: validUser.email });
    const tokenStillExists = userInDb.refreshTokens.some(
      (t) => t.token === refreshToken,
    );
    expect(tokenStillExists).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/auth/logoutall  (requires Bearer token)
// ─────────────────────────────────────────────────────────────────────────────

describe("POST /api/v1/auth/logoutall", () => {
  it("should clear ALL refreshTokens from the DB", async () => {
    const session1 = await registerAndLogin();

    // Login again to accumulate a second token
    await request(app)
      .post("/api/v1/auth/login")
      .send({ email: validUser.email, password: validUser.password });

    await request(app)
      .post("/api/v1/auth/logoutall")
      .set("Authorization", `Bearer ${session1.accessToken}`);

    const userInDb = await User.findOne({ email: validUser.email });
    expect(userInDb.refreshTokens.length).toBe(0);
  });

  it("should return 401 when no Authorization header is provided", async () => {
    const res = await request(app).post("/api/v1/auth/logoutall");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
