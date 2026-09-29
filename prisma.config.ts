// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts", // Registered seed command
  },
  datasource: {
    // Uses DIRECT_URL for unpooled migration connection, or falls back to DATABASE_URL
    url: env("DATABASE_URL"),
  },
});