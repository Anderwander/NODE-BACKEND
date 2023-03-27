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
  let date_time = req.body.date_time;
  let idstadium = req.body.idstadium;
  let idtournament = req.body.idtournament;
  let sql =
    "INSERT INTO game (name,date_time, idstadium,idtournament)\
  VALUES (?,?,?,?)";
  connection.query(
    sql,
    [name, date_time, idstadium, idtournament],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
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
