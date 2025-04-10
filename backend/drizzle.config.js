"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
require("dotenv/config");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    dbCredentials: {
        url: process.env.DATABASE_URL ||
            "postgresql://postgres:admin@localhost:5432/forum",
    },
});
