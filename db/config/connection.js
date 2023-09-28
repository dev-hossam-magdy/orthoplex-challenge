const { CONNECTION_LIMIT, HOST, USER, PASSWORD, DATABASE } = process.env;

class DatabaseConnection {
  // static knex = undefined;

  static getConnection() {
    console.log("get conn");
    const knex = require("knex")({
      // bashagal knex
      client: "mysql",
      connection: {
        connectionLimit: CONNECTION_LIMIT,
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE,
      }, //open connection
    });
    // }
    return knex;
  }
}

module.exports = DatabaseConnection;
