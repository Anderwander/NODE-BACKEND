import Player from "../models/players.js";
import Team from "../models/teams.js";
import Stadium from "../models/stadiums.js";

const getAll = async (req, res) => {
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
    res.send(teams);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving teams.",
    });
  }
};

const getById = async (req, res) => {
  try {
    let id = req.params.id;
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
    if (!team) {
      res.status(404).send({
        message: `Cannot find team with id=${id}.`,
      });
    } else {
      res.send(team);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving teams.",
    });
  }
};

const create = async (req, res) => {
  try {
    let name = req.body.name;
    let creation_date = req.body.creation_date;
    let idstadium = req.body.idstadium;
    let team = await Team.create({
      name: name,
      creation_date: creation_date,
      idstadium: idstadium,
    });
    res.send(team);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving teams.",
    });
  }
};

const update = async (req, res) => {
  try {
    let name = req.body.name;
    let idteam = req.params.id;
    let idstadium = req.body.idstadium;
    //opción 1 (puede actualizar varios)
    let team = await Team.update(
      {
        name: name,
        idteam: idteam,
        idstadium: idstadium,
      },
      {
        where: {
          idteam: idteam,
        },
      }
    );
    /* opción 2 (llama dos veces) más orientada a objetos, 
    más programación menos basededatos, 
    si elegimos un id que no existe nos daría error directamente */

    /* PERO DE TEAMS let player = Player.findByPk(idplayer);
    player.name = name;
    player.last_name = last_name;
    player.age = age;
    player.idteam = idteam;
    player.save(); */
    res.send(team);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving teams.",
    });
  }
};

const deletes = async (req, res) => {
  try {
    let idteam = req.params.id;
    let team = await Team.destroy({
      where: {
        idteam: idteam,
      },
    });
    if (team === 0) {
      res.status(404).send({
        message: `Team with id=${id} not found`,
      });
    } else {
      res.send("Team deleted");
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving teams.",
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
