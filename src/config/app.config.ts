import { config } from "dotenv";

config();

export const appConfig = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    jwtSecretExpires: process.env.JWT_ACCESS_EXPIRES,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD
}