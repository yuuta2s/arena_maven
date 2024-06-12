const argon2 = require("argon2");
const jwt = require("jsonwebtoken");



const hashPassword = (req, res, next) => {
    // Hash the password using Argon2
    argon2.hash(req.body.password)
        .then((hashedPassword) => {
            console.log("meow")
            // Assign the hashed password to req.body.password
            req.body.password = hashedPassword;
            // Call next middleware
            next();
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const verifyPassword = (req, res) => {
    argon2
      .verify(req.user.password, req.body.password)
      .then((isVerified) => {
        if (isVerified) {
            console.log("verifiée")
          const payload = { sub: req.user.id };
  
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "4h",
          }
        );
  
          delete req.user.password;
          res.send({token, user: req.user.id });
        } else {
          res.sendStatus(401);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  

module.exports = {
    hashPassword,
    verifyPassword,
};
