import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PIN,
  jwt_access_secret: process.env.ACCESS_TOKEN_SECRET,
  jwt_refresh_secret: process.env.REFRESH_TOKEN_SECRET,
  jwt_access_expires_in: process.env.ACCESS_TOKEN_EXPIRE,
  jwt_refresh_expires_in: process.env.REFRESH_TOKEN_EXPIRE,
};
