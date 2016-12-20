import databaseParams from "./connection/database.constants";
const { database, username, password, host, dialect } = databaseParams;

const Sequelize = require("sequelize");
export const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});
