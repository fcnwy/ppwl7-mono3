// import { PrismaClient } from "../src/generated/prisma/client";
// import { PrismaLibSql } from "@prisma/adapter-libsql";

// const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL || "file:./dev.db" });
// export const prisma = new PrismaClient({ adapter });

import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DB_AUTH_TOKEN,
});

export const prisma = new PrismaClient({ adapter });