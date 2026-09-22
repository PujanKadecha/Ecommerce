/**
 * jest.setup.env.js
 * Runs via Jest "setupFiles" — before any module is loaded.
 * Sets dummy environment variables so third-party SDK constructors
 * (e.g. Stripe, JWT) don't crash during import in the test environment.
 */

// Stripe
process.env.STRIPE_SECRET_KEY =
  process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_for_jest";

// JWT — must match the keys read by config/env.js
process.env.JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "test_access_secret_key";
process.env.JWT_ACCESS_EXPIRES =
  process.env.JWT_ACCESS_EXPIRES || "15m";
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "test_refresh_secret_key";
process.env.JWT_REFRESH_EXPIRES =
  process.env.JWT_REFRESH_EXPIRES || "7d";
