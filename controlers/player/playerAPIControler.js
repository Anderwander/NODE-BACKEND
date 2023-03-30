import playerControler from "./playerControler.js";

const getAll = async (req, res) => {
  let result = await playerControler.getAll();
  if (result[0] === 0) {
    res.send(result[1]);
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
      res.send(player);
    }
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving players",
    });
  }
};

const create = async (req, res) => {
  let data = {
    name: req.body.name,
    last_name: req.body.last_name,
    age: req.body.age,
    idteam: req.body.idteam,
  };

  let result = await playerControler.create(data);
  if (result[0] === 0) {
    res.send(result[1]);
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving players.",
    });
  }
};

const update = async (req, res) => {
  let data = {
    name: req.body.name,
    last_name: req.body.last_name,
    age: req.body.age,
    idteam: req.body.idteam,
  };

  let idplayer = req.params.id;
  let result = await playerControler.update(data, idplayer);

  if (result[0] === 0) {
    res.send(result[1]);
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving players.",
    });
  }
};

const deletes = async (req, res) => {
  let idplayer = req.params.id;
  let result = await playerControler.deletes(idplayer);
  if (result === 0) {
    if (result[1] === 0) {
      res.status(404).send({
        message: `Player with id=${id} not found`,
      });
    } else {
      res.send("Player deleted");
    }
  } else {
    let error = result[1];
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
