// prisma.config.ts
import { defineConfig } from "prisma/config";
import dotenv from "dotenv";
import path from "path";

// ✅ .env.local read karein
dotenv.config({ 
  path: path.resolve(process.cwd(), '.env.local') 
});

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx lib/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});