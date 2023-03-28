import connection from "../config/db.js";

const getAll = (req, res) => {
  let sql =
    "SELECT *\
  FROM game";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
  //return query
};

const getById = (req, res) => {
  let sql =
    "SELECT *\
   FROM game \
   WHERE idgame=?";
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const create = (req, res) => {
  let name = req.body.name;
  let datetime = req.body.datetime;
  let idstadium = req.body.idstadium;
  let idtournament = req.body.idtournament;
  let sql =
    "INSERT INTO game (name,datetime, idstadium,idtournament)\
  VALUES (?,?,?,?)";
  connection.query(
    sql,
    [name, datetime, idstadium, idtournament],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};

const update = (req, res) => {
  let name = req.body.name;
  let idgame = req.params.id;
  let idstadium = req.body.idstadium;
  let sql =
    "UPDATE game\
    SET name=?,idstadium=? \
  WHERE idgame=?";
  connection.query(sql, [name, idstadium, idgame], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const deletes = (req, res) => {
  let idgame = req.params.id;
  let sql =
    "DELETE FROM game\
    WHERE idgame=?";
  connection.query(sql, [idgame], (err, result) => {
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
