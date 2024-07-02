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
peu
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
