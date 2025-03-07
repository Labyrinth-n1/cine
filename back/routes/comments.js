const express = require('express');
const Comment = require('../models/comment');  // Assurez-vous que le modèle de commentaire est correctement importé
const router = express.Router();

// Route pour ajouter un commentaire
router.post('/comments', async (req, res) => {
  const { movieId, userId, text } = req.body;

  try {
    // Vérifier si les informations nécessaires sont présentes
    if (!movieId || !userId || !text) {
      return res.status(400).json({ message: 'Les informations sont incomplètes' });
    }

    // Créer un nouveau commentaire
    const newComment = new Comment({
      movieId,
      userId,
      text,
      date: new Date(),
    });

    // Sauvegarder le commentaire dans la base de données
    await newComment.save();
    res.status(201).json(newComment);

  } catch (err) {
    console.error('Erreur lors de l\'ajout du commentaire', err);
    res.status(500).json({ message: 'Erreur du serveur', error: err });
  }
});

// Route pour récupérer les commentaires d'un film spécifique
router.get('/comments/:movieId', async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: req.params.movieId })
      .populate('userId', 'firstName lastName') // Récupère le prénom et nom de l'utilisateur
      .sort({ createdAt: -1 }); // Trie les commentaires du plus récent au plus ancien

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires', error: err });
  }
});


module.exports = router;
