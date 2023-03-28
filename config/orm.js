import { Sequelize } from "sequelize";

const sequelize = new Sequelize("petanca", "root", "miPetank", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});

export default sequelize;
