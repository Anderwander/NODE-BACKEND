import teamController from "./teamController.js";

const getAll = async (req, res) => {
  let result = await teamController.getAll();
  if (result[0] === 0) {
    res.send(result[1]);
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

const create = async (req, res) => {
  let data = {
    name: req.body.name,
    creation_date: req.body.creation_date,
    idcaptain: req.body.idcaptain,
    idstadium: req.body.idstadium,
  };
  let result = await teamController.create(data);
  if (result[0] === 0) {
    res.send(result[1]);
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving teams.",
    });
  }
};

const update = async (req, res) => {
  let data = {
    name: req.body.name,
    idcaptain: req.body.idcaptain,
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
  if (result === 0) {
    if (result[1] === 0) {
      res.status(404).send({
        message: `Team with id=${id} not found`,
      });
    } else {
      res.send("Team deleted");
    }
  } else {
    let error = result[1];
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
