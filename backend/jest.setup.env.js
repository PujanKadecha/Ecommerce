process.env.STRIPE_SECRET_KEY =
  process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_for_jest";

process.env.JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "test_access_secret_key";
process.env.JWT_ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || "15m";
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "test_refresh_secret_key";
process.env.JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d";
