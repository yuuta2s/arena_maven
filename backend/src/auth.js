
// const argon2 = require("argon2");
// const jwt = require("jsonwebtoken");



// const hashPassword = (req, res, next) => {
//   console.log(req.body, "toujours des messages");
//     // Hash the password using Argon2
//     argon2.hash(req.body.password)
//         .then((hashedPassword) => {
//             console.log("meow")
//             // Assign the hashed password to req.body.password
//             req.body.password = hashedPassword;
//             // Call next middleware
//             next();
//         })
//         .catch((err) => {
//             console.error(err);
//             res.sendStatus(500);
//         });
// };

// const verifyPassword = (req, res) => {
//     argon2
//       .verify(req.user.password, req.body.password)
//       .then((isVerified) => {
//         if (isVerified) {
//             console.log("verifiée")
//           const payload = { sub: req.user.id };
  
//           const token = jwt.sign(payload, process.env.JWT_SECRET, {
//             expiresIn: "4h",
//           }
//         );
  
//           delete req.user.password;
//           res.send({token, user: req.user.id });
//         } else {
//           res.sendStatus(401);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         res.sendStatus(500);
//       });
//   };

//   const verifyToken = (req, res, next) => {
//     try {
//       const authorizationHeader = req.get("Authorization");
  
//       if (authorizationHeader == null) {
//         throw new Error("Authorization header is missing");
//       }
  
//       const [type, token] = authorizationHeader.split(" ");
  
//       if (type !== "Bearer") {
//         throw new Error("Authorization header has not the 'Bearer' type");
//       }
  
//       req.payload = jwt.verify(token, process.env.JWT_SECRET);
  
//       next();
//     } catch (err) {
//       console.error(err);
//       res.sendStatus(401);
//     }
//   };



// module.exports = {
//     hashPassword,
//     verifyPassword,
//     verifyToken,

// };


// const express = require('express');
// const router = express.Router();
// const argon2 = require('argon2');
// const jwt = require('jsonwebtoken');
// const db = require('../db'); // Assurez-vous d'importer correctement votre module de base de données

// // Middleware de hachage de mot de passe
// const hashPassword = (req, res, next) => {
//   console.log(req.body, "toujours des messages");
//   argon2.hash(req.body.password)
//     .then((hashedPassword) => {
//       console.log("meow");
//       req.body.password = hashedPassword;
//       next();
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// // Middleware de vérification de mot de passe
// const verifyPassword = (req, res) => {
//   argon2.verify(req.user.password, req.body.password)
//     .then((isVerified) => {
//       if (isVerified) {
//         console.log("verifiée");
//         const payload = { sub: req.user.id };

//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" });

//         delete req.user.password;
//         res.send({ token, user: req.user.id });
//       } else {
//         res.sendStatus(401);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// // Middleware de vérification de token
// const verifyToken = (req, res, next) => {
//   try {
//     const authorizationHeader = req.get("Authorization");

//     if (authorizationHeader == null) {
//       throw new Error("Authorization header is missing");
//     }

//     const [type, token] = authorizationHeader.split(" ");

//     if (type !== "Bearer") {
//       throw new Error("Authorization header has not the 'Bearer' type");
//     }

//     req.payload = jwt.verify(token, process.env.JWT_SECRET);

//     next();
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(401);
//   }
// };

// // Endpoint de connexion
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const [user] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const isPasswordValid = await argon2.verify(user.password, password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '4h' });

//     const { password: userPassword, ...userData } = user;
//     res.json({ token, user: userData });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = {
//   hashPassword,
//   verifyPassword,
//   verifyToken,
//   router
// };

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
// const db = require('../db'); // Assurez-vous d'importer correctement votre module de base de données

// Middleware de hachage de mot de passe
const hashPassword = (req, res, next) => {
  argon2.hash(req.body.password)
    .then((hashedPassword) => {
      req.body.password = hashedPassword;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Middleware de vérification de mot de passe
const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
          console.log("verifiée")
        const payload = { sub: { id : req.user.id, username : req.user.username, role : req.user.role, email : req.user.email} }; // Create a JWT payload with the user's ID
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

// Middleware de vérification de token
const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken
};