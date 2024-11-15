const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "kiarash",
  database: "inventory_db",
  password: "Kiarash1",
  port: 5432,
});
