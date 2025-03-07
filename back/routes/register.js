// routes/register.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');  // Le modèle User
const router = express.Router();

// Code admin secret (à définir ici ou récupérer depuis une variable d'environnement)
const ADMIN_SECRET_CODE = 'bob';  // Définir ici le code secret, vous pouvez aussi le mettre dans .env

// Route d'inscription
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, code } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    // Vérification du code admin (si le code est fourni)
    if (code && code !== ADMIN_SECRET_CODE) {
      return res.status(400).json({ message: 'Code admin incorrect' });
    }

    // Déterminer le rôle basé sur la présence du code secret
    const role = code === ADMIN_SECRET_CODE ? 'admin' : 'user';

    // Créer un nouvel utilisateur
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,  // Le mot de passe sera automatiquement crypté
      role,      // Rôle de l'utilisateur (admin ou user)
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès', role });  // Renvoyer le rôle

  } catch (err) {
    res.status(500).json({ message: 'Erreur du serveur', error: err });
  }
});

module.exports = router;
