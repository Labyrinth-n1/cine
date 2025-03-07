const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Modèle utilisateur
const router = express.Router();

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Accès refusé, token manquant' });

  try {
    token = token.replace("Bearer ", "");
    const verified = jwt.verify(token, 'secretkey'); // Vérifie le token
    req.user = verified; // Ajoute les infos de l'utilisateur au `req`
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide' });
  }
};

// Route protégée pour obtenir les infos de l'utilisateur connecté
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclut le mot de passe
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
});

module.exports = router;
