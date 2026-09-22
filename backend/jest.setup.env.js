/**
 * jest.setup.env.js
 * Runs via Jest "setupFiles" — before any module is loaded.
 * Sets dummy environment variables so third-party SDK constructors
 * (e.g. Stripe) don't crash during import in the test environment.
 */
process.env.STRIPE_SECRET_KEY =
  process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_for_jest";
