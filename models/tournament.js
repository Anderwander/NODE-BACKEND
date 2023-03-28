import connection from "../config/orm.js";
import Sequelize from "sequelize";
import Stadium from "./stadiums.js";
import Team from "./teams.js";

const Tournament = connection.define(
  "tournament",
  {
    idtournament: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Tournament;
