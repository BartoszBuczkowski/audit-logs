import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { Database } from "./db/types";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

const encodedUser = encodeURIComponent(dbUser || "");
console.log("> ", dbPassword);
const encodedPassword = encodeURIComponent(dbPassword || "");
const encodedDbName = encodeURIComponent(dbName || "");

const connectionString = `postgresql://${encodedUser}:${encodedPassword}@${dbHost}:${dbPort}/${encodedDbName}?sslmode=require`;

console.log(connectionString);

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    }),
  }),
});
