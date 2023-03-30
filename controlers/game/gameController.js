import Stadium from "../../models/stadiums.js";
import Game from "../../models/games.js";
import Tournament from "../../models/tournament.js";

const getAll = async (req, res) => {
  try {
    let games = await Game.findAll({
      attributes: ["idgame", "name", "datetime", "idstadium", "idtournament"],
      include: [
        { model: Stadium, attributes: ["name", "idstadium"], as: "stadium" },
        {
          model: Tournament,
          attributes: ["name", "idtournament"],
          as: "tournament",
        },
      ],
    });
    res.send(games);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving games.",
    });
  }
};

const getById = async (req, res) => {
  try {
    let id = req.params.id;
    let game = await Game.findByPk(id, {
      attributes: ["idgame", "name", "datetime", "idstadium", "idtournament"],
      include: [
        { model: Stadium, attributes: ["name", "idstadium"], as: "stadium" },
        {
          model: Tournament,
          attributes: ["name", "idtournament"],
          as: "tournament",
        },
      ],
    });
    if (!game) {
      res.status(404).send({
        message: `Cannot find games with id=${id}.`,
      });
    } else {
      res.send(game);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving games.",
    });
  }
};

const create = async (req, res) => {
  try {
    let name = req.body.name;
    let datetime = req.body.datetime;
    let idstadium = req.body.idstadium;
    let idtournament = req.body.idtournament;
    let game = await Game.create({
      name: name,
      datetime: datetime,
      idstadium: idstadium,
      idtournament: idtournament,
    });
    res.send(game);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving games.",
    });
  }
};

const update = async (req, res) => {
  try {
    let name = req.body.name;
    let idgame = req.params.id;
    let idstadium = req.body.idstadium;
    //opción 1 (puede actualizar varios)
    let game = await Game.update(
      {
        name: name,
        idgame: idgame,
        idstadium: idstadium,
      },
      {
        where: {
          idgame: idgame,
        },
      }
    );
    /* opción 2 (llama dos veces) más orientada a objetos, 
    más programación menos basededatos, 
    si elegimos un id que no existe nos daría error directamente */

    /* PERO CON GAME let player = Player.findByPk(idplayer);
    player.name = name;
    player.last_name = last_name;
    player.age = age;
    player.idteam = idteam;
    player.save(); */

    res.send(game);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving games.",
    });
  }
};

const deletes = async (req, res) => {
  try {
    let idgame = req.params.id;
    let game = await Game.destroy({
      where: {
        idgame: idgame,
      },
    });
    if (game === 0) {
      res.status(404).send({
        message: `Game with id=${id} not found`,
      });
    } else {
      res.send("Game deleted");
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving games.",
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
