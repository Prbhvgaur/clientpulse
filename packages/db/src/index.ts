import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __clientpulsePrisma__: PrismaClient | undefined;
}

export * from "@prisma/client";

export const prisma =
  globalThis.__clientpulsePrisma__ ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__clientpulsePrisma__ = prisma;
}
