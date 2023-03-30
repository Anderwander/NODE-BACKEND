import Team from "../../models/teams.js";
import Stadium from "../../models/stadiums.js";
import Game from "../../models/games.js";
import Tournament from "../../models/tournament.js";

const getAll = async (req, res) => {
  try {
    let tournaments = await Tournament.findAll({
      attributes: ["idtournament", "name"],
      include: [
        {
          model: Game,
          attributes: ["name", "idgame", "datetime"],
          as: "games",
          include: [
            {
              model: Stadium,
              attributes: ["idstadium", "name"],
              as: "stadium",
            },
            { model: Team, attributes: ["idteam", "name"], as: "teams" },
          ],
        },
      ],
    });
    res.send(tournaments);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error ocurred while retrieving tournaments.",
    });
  }
};

const getById = async (req, res) => {
  try {
    let id = req.params.id;
    let tournament = await Tournament.findByPk(id, {
      attributes: ["idtournament", "name"],
      include: [
        {
          model: Game,
          attributes: ["name", "idgame"],
          as: "games",
        },
      ],
    });
    if (!tournament) {
      res.status(404).send({
        message: `Cannot find tournament with id=${id}.`,
      });
    } else {
      res.send(tournament);
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error ocurred while retrieving tournaments.",
    });
  }
};

const create = async (req, res) => {
  try {
    let name = req.body.name;
    let tournament = await Tournament.create({
      name: name,
    });
    res.send(tournament);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error ocurred while retrieving tournaments.",
    });
  }
};

const update = async (req, res) => {
  try {
    let name = req.body.name;
    let idtournament = req.params.id;
    //opción 1 (puede actualizar varios)
    let tournament = await Tournament.update(
      {
        name: name,
        idtournament: idtournament,
      },
      {
        where: {
          idtournament: idtournament,
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

    res.send(tournament);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error ocurred while retrieving tournaments.",
    });
  }
};

const deletes = async (req, res) => {
  try {
    let idtournament = req.params.id;
    let tournament = await Tournament.destroy({
      where: {
        idtournament: idtournament,
      },
    });
    if (tournament === 0) {
      res.status(404).send({
        message: `Tournament with id=${id} not found`,
      });
    } else {
      res.send("Tournament deleted");
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error ocurred while retrieving tournaments.",
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
