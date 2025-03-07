//login.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');  // Le modèle User
const jwt = require('jsonwebtoken');  // Pour générer des tokens JWT
const router = express.Router();

// Route de connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    console.log("Utilisateur trouvé :", user);  

    // Comparer le mot de passe saisi avec celui crypté dans la base de données
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey', {
      expiresIn: '1h',  // Le token expirera après 1 heure
    });

    res.status(200).json({ 
      message: 'Connexion réussie', 
      token,
      lastName: user.lastName, 
      firstName: user.firstName,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur du serveur', error: err });
  }
});


module.exports = router;
