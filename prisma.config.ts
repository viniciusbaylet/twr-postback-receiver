import { definePrismaConfig } from "prisma/config";

export default definePrismaConfig({
  schema: "prisma/schema.prisma",
  migrations: "prisma/migrations",
  datasource: {
    url: process.env.DATABASE_URL
  }
});
