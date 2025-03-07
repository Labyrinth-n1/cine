// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Récupérer le token du header

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey'); // Vérifier le token avec la clé secrète
    req.user = decoded; // Attacher les infos de l'utilisateur dans la requête
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide' });
  }
};

module.exports = verifyToken;
