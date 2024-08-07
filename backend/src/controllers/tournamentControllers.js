const models = require("../models");

const browse = (req, res) => {
  models.tournament
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
  models.tournament
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
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
  const tournament = req.body;

  tournament.id = parseInt(req.params.id, 10);

  models.tournament
    .update(tournament)
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

const add = (req, res) => {
  const { tname, tdate, nbPlayer, tdescription, torganizer_id } = req.body;
  const timage = req.file ? req.file.filename : null;
  console.log('Received data:', { tname, tdate, nbPlayer, tdescription, timage, torganizer_id });

  const tournament = {
    name: tname,
    date: tdate,
    tournament_img: timage,
    organizer_id: torganizer_id,
    total_players: nbPlayer,
    short_description: tdescription
  };

  models.tournament
    .insert(tournament)
    .then(([result]) => {
      res.location(`/tournament/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.tournament
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


const getPbyTid = (req, res) => {
  models.tournament
    .getParticipantByTournamentId(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findTbyUid= (req, res) => {
  models.tournament
    .findTournamentByUserID(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findTbyOid= (req, res) => {
  models.tournament
    .findTournamentByOrganizer(req.params.id)
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
  edit,
  add,
  destroy,
  getPbyTid,
  findTbyUid,
  findTbyOid,
};
