const models = require("../models");
const argon2 = require('argon2')


const browse = (req, res) => {
    models.user
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
    
  models.user
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

  models.user
    .update(user)
    .then((result) => {  // Removed destructuring as update likely returns the result directly
      if (result.affectedRows === 0) {
        res.sendStatus(404)
        
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {

  
  // Vérification de l'existence de l'utilisateur
  try {
    const user = req.body;
    // const existingUsers = await models.user.findAll();
  
console.log(user, "user")
    // Hash du mot de passe

    // user.password = await argon2.hash(user.password, hashingOptions);


    // Insertion de l'utilisateur dans la base de données
    const result = await models.user.insert(user);

    res.location(`/user/${result.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }

};




const getUserByEmail = (req, res, next) => {
  const { email } = req.body;
  models.user
    .findUserByEmail(email)
    .then(([users]) => {
      if (users[0] != null) {
        const [firstUser] = users;
        req.user = firstUser;
        console.log(req.user, "reqUser")
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};


const destroy = (req, res) => {
  models.user
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
  getUserByEmail,
};


