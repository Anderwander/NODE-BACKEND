import Team from "../../models/teams.js";
import Stadium from "../../models/stadiums.js";
import Game from "../../models/games.js";

const getAll = async () => {
  try {
    let stadiums = await Stadium.findAll({
      attributes: ["idstadium", "name", "address", "capacity"],
      include: [
        {
          model: Team,
          attributes: ["name", "idteam"],
          as: "teams",
        },
        {
          model: Game,
          attributes: ["name", "idgame"],
          as: "games",
        },
      ],
    });
    return [0, stadiums];
  } catch (error) {
    return [1, error];
  }
};

const getById = async (id) => {
  try {
    let stadium = await Stadium.findByPk(id, {
      attributes: ["idstadium", "name", "address", "capacity"],
      include: [
        {
          model: Team,
          attributes: ["name", "idteam"],
          as: "teams",
        },
        {
          model: Game,
          attributes: ["name", "idgame"],
          as: "games",
        },
      ],
    });
    return [0, stadium];
  } catch (error) {
    return [1, error];
  }
};

const create = async (data) => {
  try {
    let stadium = await Stadium.create(data);
    return [0, stadium];
  } catch (error) {
    return [1, error];
  }
};

const update = async (data, idstadium) => {
  try {
    //opción 1 (puede actualizar varios)
    let stadium = await Stadium.update(data, {
      where: {
        idstadium: idstadium,
      },
    });

    return [0, stadium];
  } catch (error) {
    return [1, error];
  }
};

const deletes = async (idstadium) => {
  try {
    let stadium = await Stadium.destroy({
      where: {
        idstadium: idstadium,
      },
    });
    return [0, stadium];
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
