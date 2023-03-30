import connection from "../config/orm.js";
import Sequelize from "sequelize";
import Team from "./teams.js";

const Player = connection.define(
  "player",
  {
    idplayer: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false,
      required: true,
    },
    last_name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unsigned: true,
    },
    idteam: {
      type: Sequelize.INTEGER,
      allowNull: true,
      unsigned: true,
      references: {
        model: "team",
        key: "idteam",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Player.belongsTo(Team, {
  foreignKey: "idteam",
});
Team.hasMany(Player, {
  foreignKey: "idteam",
});
Team.belongsTo(Player, {
  foreignKey: "idcaptain",
  as: "captain",
});
export default Player;
