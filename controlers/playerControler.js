import Player from "../models/players.js";
import Team from "../models/teams.js";

const getAll = async (req, res) => {
  try {
    let players = await Player.findAll({
      attributes: ["idplayer", "name", "last_name", "age"],
      include: {
        model: Team,
        attributes: ["name", "idteam"],
        as: "team",
      },
    });
    res.send(players);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving players.",
    });
  }
};

const getById = async (req, res) => {
  try {
    let id = req.params.id;
    let player = await Player.findByPk(id, {
      attributes: ["idplayer", "name", "last_name", "age"],
      include: {
        model: Team,
        attributes: ["name", "idteam"],
        as: "team",
      },
    });
    if (!player) {
      res.status(404).send({
        message: `Cannot find player with id=${id}.`,
      });
    } else {
      res.send(player);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving players.",
    });
  }
};

const create = async (req, res) => {
  try {
    let name = req.body.name;
    let last_name = req.body.last_name;
    let age = req.body.age;
    let idteam = req.body.idteam;
    let player = await Player.create({
      name: name,
      last_name: last_name,
      age: age,
      idteam: idteam,
    });
    res.send(player);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving players.",
    });
  }
};

const update = async (req, res) => {
  try {
    let name = req.body.name;
    let last_name = req.body.last_name;
    let age = req.body.age;
    let idteam = req.body.idteam;
    let idplayer = req.params.id;
    //opción 1 (puede actualizar varios)
    let player = await Player.update(
      {
        name: name,
        last_name: last_name,
        age: age,
        idteam: idteam,
      },
      {
        where: {
          idplayer: idplayer,
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

    res.send(player);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving players.",
    });
  }
};

const deletes = async (req, res) => {
  try {
    let idplayer = req.params.id;
    let player = await Player.destroy({
      where: {
        idplayer: idplayer,
      },
    });
    if (player === 0) {
      res.status(404).send({
        message: `Player with id=${id} not found`,
      });
    } else {
      res.send("Player deleted");
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving players.",
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
