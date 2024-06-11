const models = require("../models");

const browse = (req, res) => {
    models.tournament_match
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  

module.exports = {
  browse,
};


const read = (req, res) => {
    
  models.tournament_match
    .find(req.params.id)
    .then((rows) => {  // Removed destructuring as find likely returns the rows directly
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.tournament_match
    .update(tournament_match)
    .then((result) => {  // Removed destructuring as update likely returns the result directly
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const tournament_match = req.body;

  // TODO validations (length, format...)

  models.tournament_match
    .insert(tournament_match)
    .then((result) => {  // Removed destructuring as insert likely returns the result directly
      res.location(`/tournament_match/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.tournament_match
    .delete(req.params.id)
    .then((result) => {  // Removed destructuring as delete likely returns the result directly
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
