// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Enable WebSocket support for Node.js
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL!;

// Pass the config object directly to PrismaNeon
const adapter = new PrismaNeon({ connectionString });

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;