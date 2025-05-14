import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

if(!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in .env file");
}
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
   table: "__drizzle_migrations",
   schema: "public",
  },
  verbose: true,
  strict: true,
});
