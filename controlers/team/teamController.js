import Player from "../../models/players.js";
import Team from "../../models/teams.js";
import Stadium from "../../models/stadiums.js";

const getAll = async () => {
  try {
    let teams = await Team.findAll({
      attributes: ["idteam", "name", "creation_date", "idstadium"],
      include: [
        {
          model: Player,
          attributes: ["name", "last_name", "age", "idplayer"],
          as: "players",
        },
        {
          model: Stadium,
          attributes: ["idstadium", "name", "address", "capacity"],
          as: "stadium",
        },
        {
          model: Player,
          attributes: ["name", "last_name", "age", "idplayer"],
          as: "captain",
        },
      ],
    });
    return [0, teams];
  } catch (error) {
    return [1, error];
  }
};

const getById = async (id) => {
  try {
    let team = await Team.findByPk(id, {
      attributes: ["idteam", "name", "creation_date", "idstadium"],
      include: [
        {
          model: Player,
          attributes: ["name", "idplayer"],
          as: "players",
        },
        {
          model: Stadium,
          attributes: ["idstadium", "name", "address", "capacity"],
          as: "stadium",
        },
      ],
    });
    return [0, player];
  } catch (error) {
    return [1, error];
  }
};

const create = async (data) => {
  try {
    let team = await Team.create(data);
    return [0, team];
  } catch (error) {
    return [1, error];
  }
};

const update = async (data, idteam) => {
  try {
    //opción 1 (puede actualizar varios)
    let team = await Team.update(data, {
      where: {
        idteam: idteam,
      },
    });
    return [0, team];
  } catch (error) {
    return [1, error];
  }
};

const deletes = async (idteam) => {
  try {
    let team = await Team.destroy({
      where: {
        idteam: idteam,
      },
    });
    return [0, team];
  } catch (error) {
    return [1, error];
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  deletes,
};
