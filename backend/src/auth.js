// const argon2 = require('argon2');
// const jwt = require('jsonwebtoken');
// // const db = require('../db'); // Assurez-vous d'importer correctement votre module de base de données

// // Middleware de hachage de mot de passe
// const hashPassword = (req, res, next) => {
//   argon2.hash(req.body.password)
//     .then((hashedPassword) => {
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
//   argon2
//     .verify(req.user.password, req.body.password)
//     .then((isVerified) => {
//       if (isVerified) {
//           console.log("verifiée")
//         const payload = { sub: { id : req.user.id, username : req.user.username, role : req.user.role, email : req.user.email} }; // Create a JWT payload with the user's ID
//         const token = jwt.sign(payload, process.env.JWT_SECRET, {
//           expiresIn: "1s",
//         }
//       );

//         delete req.user.password;
//         res.send({token, user: req.user.id });
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

//     if (!authorizationHeader) {
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

// module.exports = {
//   hashPassword,
//   verifyPassword,
//   verifyToken
// };

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Fonction de hachage de mot de passe
const hashPassword = async (req, res, next) => {
  try {
    if (!req.body.password) {
      throw new Error('Password is required');
    }
    req.body.password = await argon2.hash(req.body.password);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Fonction de vérification de mot de passe
const verifyPassword = async (req, res, next) => {
  try {
    const isValid = await argon2.verify(req.user.password, req.body.password);
    if (!isValid) {
      return res.status(401).send('Unauthorized');
    }

    // Création du token JWT
    const payload = {
      sub: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Expiration après 1 heure

    // Envoi du token et de l'ID utilisateur dans la réponse
    res.json({ token, user: req.user.id });
  } catch (error) {
    console.error('Error verifying password:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Middleware de vérification de token
const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header is missing or invalid');
    }

    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.sub; // Ajoute les données du token à l'objet req pour une utilisation ultérieure
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(401).send('Unauthorized');
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken
};
