import connection from "../config/orm.js";
import Sequelize from "sequelize";
import Stadium from "./stadiums.js";
import Game from "./games.js";
import Tournament from "./tournament.js";

const Team = connection.define(
  "team",
  {
    idteam: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    creation_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    idcaptain: {
      type: Sequelize.INTEGER,
      allowNull: true,
      unsigned: true,
      references: {
        model: "player",
        key: "idplayer",
      },
    },
    idstadium: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unsigned: true,
      references: {
        model: "stadium",
        key: "idstadium",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Team.belongsTo(Stadium, {
  foreignKey: "idstadium",
});
Stadium.hasMany(Team, {
  foreignKey: "idstadium",
});

Team.belongsToMany(Game, {
  through: "team_has_game",
  foreignKey: "idteam",
  timestamps: false,

  otherKey: "idgame",
});
Game.belongsToMany(Team, {
  through: "team_has_game",
  foreignKey: "idgame",
  timestamps: false,
  otherKey: "idteam",
});

Team.belongsToMany(Tournament, {
  through: "tournament_has_team",
  foreignKey: "idteam",
  timestamps: false,
  otherKey: "idtournament",
});
Tournament.belongsToMany(Team, {
  through: "tournament_has_team",
  foreignKey: "idtournament",
  timestamps: false,
  otherKey: "idteam",
});
export default Team;
