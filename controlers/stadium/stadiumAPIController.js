import stadiumController from "./stadiumController.js";

const getAll = async (req, res) => {
  let result = await stadiumController.getAll();
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
  let result = await stadiumController.getById(id);
  if (result[0] === 0) {
    let stadium = result[1];
    if (!stadium) {
      res.status(404).send({
        message: `Cannot find stadium with id=${id}.`,
      });
    } else {
      res.send(stadium);
    }
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stadiums",
    });
  }
};

const create = async (req, res) => {
  let data = {
    name: req.body.name,
    address: req.body.address,
    capacity: req.body.capacity,
  };

  let result = await stadiumController.create(data);
  if (result[0] === 0) {
    res.send(result[1]);
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while creating stadiums.",
    });
  }
};

const update = async (req, res) => {
  let data = {
    name: req.body.name,
    address: req.body.address,
    capacity: req.body.capacity,
  };

  let idstadium = req.params.id;
  let result = await stadiumController.update(data, idstadium);

  if (result[0] === 0) {
    res.send(result[1]);
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while updating stadiums.",
    });
  }
};

const deletes = async (req, res) => {
  let idstadium = req.params.id;
  let result = await stadiumController.deletes(idstadium);
  if (result === 0) {
    if (result[1] === 0) {
      res.status(404).send({
        message: `Stadium with id=${id} not found`,
      });
    } else {
      res.send("Stadium deleted");
    }
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while deleting stadiums.",
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
