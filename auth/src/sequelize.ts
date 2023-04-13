import { Sequelize } from "sequelize-typescript";

async function init() {
    const sequelize = new Sequelize("auth-db", "user", "pass", {
        host: "auth-mysql-srv",
        dialect: "mysql",
        models: [__dirname + "/models"],
    });

    // creates tables based on models
    return await sequelize.sync({ force: true });
}


export default init();
