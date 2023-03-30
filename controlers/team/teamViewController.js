import teamController from "./teamController.js";

const getAll = async (req, res) => {
  let result = await teamController.getAll();
  if (result[0] === 0) {
    res.render("team/list", { teams: result[1] });
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving teams.",
    });
  }
};

const getById = async (req, res) => {
  let id = req.params.id;
  let result = await teamController.getById(id);
  if (result[0] === 0) {
    let team = result[1];
    if (!team) {
      res.status(404).send({
        message: `Cannot find team with id=${id}.`,
      });
    } else {
      res.send(team);
    }
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving teams",
    });
  }
};

const createForm = async (req, res) => {
  let results = await teamController.getAll();
  let error = req.query.error;
  if (results[0] === 1 || results[1] === []) {
    res.render("team/new");
  } else {
    let teams = results[1];
    res.render("team/new", { teams: teams, error: error });
  }
};

const create = async (req, res) => {
  let data = {
    name: req.body.name == "" ? null : req.body.name,
    creation_date: req.body.creation_date,
    idstadium: req.body.idstadium == 0 ? null : req.body.idstadium,
  };
  let result = await teamController.create(data);
  if (result[0] === 0) {
    res.redirect("/teams");
  } else {
    let error = result[1];
    let errorUri = encodeURIComponent(error.message);

    res.redirect(`/teams/new?error=${errorUri}`);
  }
};

const update = async (req, res) => {
  let data = {
    name: req.body.name,
    idstadium: req.body.idstadium,
  };

  let idteam = req.params.id;
  let result = await teamController.update(data, idteam);

  if (result[0] === 0) {
    res.send(result[1]);
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving teams.",
    });
  }
};

const deletes = async (req, res) => {
  let idteam = req.params.id;
  let result = await teamController.deletes(idteam);
  res.redirect("/teams");
};

export default {
  getAll,
  getById,
  createForm,
  create,
  update,
  deletes,
};
