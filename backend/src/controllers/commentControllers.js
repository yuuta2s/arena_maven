const models = require("../models");
const {validationResult} = require('express-validator');

const browse = (req, res) => {
  models.comment
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.comment
    .find(req.params.id)
    .then(([rows]) => {
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

const add = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const comment = req.body;

  models.comment
    .insert(comment)
    .then(([result]) => {
      const insertedComment = {
        id: result.insertId, // Assurez-vous que l'ID est correctement défini ici
        ...comment,
      };
      res.status(201).json(insertedComment); // Retournez l'objet de commentaire avec l'ID
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


const edit = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

    const comment = req.body;
    comment.id = parseInt(req.params.id, 10);
  
    if (isNaN(comment.id)) {
      res.status(400).send("Invalid comment ID");
      return;
    }
  //express validator
    models.comment
      .update(comment)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404); // No comment found to update
        } else {
          res.sendStatus(204); // Update successful
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500); // Server error
      });
  };
  
  
const destroy = (req, res) => {
  models.comment
    .delete(req.params.id)
    .then(([result]) => {
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

const findByTournament = (req, res) => {
  models.comment
    .findByTournament(req.params.id)
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
  read,
  add,
  edit,
  destroy,
  findByTournament,
};
