import pg from "pg";
const { Pool } = pg;

require("dotenv").config();

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// module.exports = pool;
