import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "config";
import pg from "pg";

export const connect = new pg.Pool({
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
});
