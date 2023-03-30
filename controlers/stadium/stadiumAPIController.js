import Team from "../../models/teams.js";
import Stadium from "../../models/stadiums.js";
import Game from "../../models/games.js";

const getAll = async (req, res) => {
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
    res.send(stadiums);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stadiums.",
    });
  }
};

const getById = async (req, res) => {
  try {
    let id = req.params.id;
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
    if (!stadium) {
      res.status(404).send({
        message: `Cannot find stadium with id=${id}.`,
      });
    } else {
      res.send(stadium);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stadiums.",
    });
  }
};

const create = async (req, res) => {
  try {
    let name = req.body.name;
    let capacity = req.body.capacity;
    let stadium = await Stadium.create({
      name: name,
      capacity: capacity,
    });
    res.send(stadium);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stadiums.",
    });
  }
};

const update = async (req, res) => {
  try {
    let name = req.body.name;
    let capacity = req.body.capacity;
    let idstadium = req.params.id;
    //opción 1 (puede actualizar varios)
    let stadium = await Stadium.update(
      {
        name: name,
        capacity: capacity,
        idstadium: idstadium,
      },
      {
        where: {
          idstadium: idstadium,
        },
      }
    );
    /* opción 2 (llama dos veces) más orientada a objetos, 
    más programación menos basededatos, 
    si elegimos un id que no existe nos daría error directamente */

    /* let player = Player.findByPk(idplayer);
    player.name = name;
    player.last_name = last_name;
    player.age = age;
    player.idteam = idteam;
    player.save(); */

    res.send(stadium);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stadiums.",
    });
  }
};

const deletes = async (req, res) => {
  try {
    let idstadium = req.params.id;
    let stadium = await Stadium.destroy({
      where: {
        idstadium: idstadium,
      },
    });
    if (stadium === 0) {
      res.status(404).send({
        message: `Stadium with id=${id} not found`,
      });
    } else {
      res.send("Stadium deleted");
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stadiums.",
    });
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  deletes,
};
