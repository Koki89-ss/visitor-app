const sql = require("mssql");

const config = {
  server: "DESKTOP-JALOKH3",
  database: "VisitorsManagementSystem",
  user: "visitor_user",
  password: "Password123!",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool;

async function getPool() {
  if (!pool) {
    pool = await sql.connect(config);
    console.log("Connected to SQL Server");
  }
  return pool;
}

module.exports = { sql, getPool };
