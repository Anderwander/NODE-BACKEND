import stadiumController from "./stadiumController.js";

const getAll = async (req, res) => {
  let result = await stadiumController.getAll();
  if (result[0] === 0) {
    res.render("stadium/list", { stadiums: result[1] });
  } else {
    let error = result[1];
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stadiums.",
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

const createForm = async (req, res) => {
  let results = await stadiumController.getAll();
  let error = req.query.error;
  if (results[0] === 1 || results[1] === []) {
    res.render("stadium/new");
  } else {
    let stadiums = results[1];
    res.render("stadium/new", { stadiums: stadiums, error: error });
  }
};

const create = async (req, res) => {
  let data = {
    name: req.body.name == "" ? null : req.body.name,
    address: req.body.address,
    capacity: req.body.capacity,
  };

  let result = await stadiumController.create(data);
  if (result[0] === 0) {
    res.redirect("/stadiums");
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
  res.redirect("/stadiums");
};

export default {
  getAll,
  getById,
  createForm,
  create,
  update,
  deletes,
};
