import connection from "../config/db.js";

const getAll = (req, res) => {
  let sql =
    "SELECT team.idteam, team.name as team_name,creation_date\
  FROM team";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
  //return query
};

const getById = (req, res) => {
  let sql =
    "SELECT team.idteam, team.name as team_name\
   FROM team \
   WHERE idteam=?";
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const create = (req, res) => {
  let name = req.body.name;
  let creation_date = req.body.creation_date;
  let idstadium = req.body.idstadium;
  let sql =
    "INSERT INTO team (name,creation_date, idstadium)\
  VALUES (?,?,?)";
  connection.query(sql, [name, creation_date, idstadium], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const update = (req, res) => {
  let name = req.body.name;
  let idteam = req.params.id;
  let idstadium = req.body.idstadium;
  let sql =
    "UPDATE team\
    SET name=?,idstadium=? \
  WHERE idteam=?";
  connection.query(sql, [name, idstadium, idteam], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const deletes = (req, res) => {
  let idplayer = req.params.id;
  let sql =
    "DELETE FROM team\
    WHERE idteam=?";
  connection.query(sql, [idplayer], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  deletes,
};
