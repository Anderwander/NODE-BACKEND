import playerControler from "./playerControler.js";
import teamController from "../team/teamController.js";

const getAll = async (req, res) => {
  let result = await playerControler.getAll();
  if (result[0] === 0) {
    res.render("player/list", { players: result[1] });
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving players.",
    });
  }
};

const getById = async (req, res) => {
  let id = req.params.id;
  let result = await playerControler.getById(id);
  if (result[0] === 0) {
    let player = result[1];
    if (!player) {
      res.status(404).send({
        message: `Cannot find player with id=${id}.`,
      });
    } else {
      res.render("player/show", { player });
    }
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving players",
    });
  }
};

const createForm = async (req, res) => {
  let results = await teamController.getAll();
  let error = req.query.error;
  if (results[0] === 1 || results[1] === []) {
    res.render("player/new");
  } else {
    let teams = results[1];
    res.render("player/new", { teams: teams, error: error });
  }
};

const create = async (req, res) => {
  let data = {
    name: req.body.name == "" ? null : req.body.name,
    last_name: req.body.last_name == "" ? null : req.body.last_name,
    age: req.body.age,
    idteam: req.body.idteam == 0 ? null : req.body.idteam,
  };

  let result = await playerControler.create(data);
  if (result[0] === 0) {
    res.redirect("/players");
  } else {
    let error = result[1];
    let errorUri = encodeURIComponent(error.message);

    res.redirect(`/players/new?error=${errorUri}`);
  }
};

const updateForm = async (req, res) => {
  let idplayer = req.params.id;
  let result = await playerControler.getById(idplayer);
  let results = await teamController.getAll();
  const player = result[1];
  const teams = results[1];

  res.render("player/edit", { player, teams });
};

const update = async (req, res) => {
  let data = {
    name: req.body.name == "" ? null : req.body.name,
    last_name: req.body.last_name == "" ? null : req.body.last_name,
    age: req.body.age,
    idteam: req.body.idteam == 0 ? null : req.body.idteam,
  };

  let idplayer = req.params.id;
  let result = await playerControler.update(data, idplayer);

  if (result[0] === 0) {
    res.redirect("/players");
  } else {
    let error = result[1];
    let errorUri = encodeURIComponent(error.message);
    res.redirect(`/players?error=${errorUri}`);
  }
};

const deletes = async (req, res) => {
  let idplayer = req.params.id;
  let result = await playerControler.deletes(idplayer);
  res.redirect("/players");
};

export default {
  getAll,
  getById,
  createForm,
  create,
  updateForm,
  update,
  deletes,
};
