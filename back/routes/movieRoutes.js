// routes/addMovie.js
const express = require('express');
const Movie = require('../models/movie'); // Le modèle Movie
const router = express.Router();

// Route pour ajouter un film
router.post('/addMovie', async (req, res) => {
  const { title, description, stars, date, image } = req.body;

  try {
    // Vérifier si un film avec ce titre existe déjà
    const existingMovie = await Movie.findOne({ title });
    if (existingMovie) {
      return res.status(400).json({ message: 'Film déjà existant' });
    }

    // Créer un nouveau film
    const newMovie = new Movie({
      title,
      description,
      stars,
      date,
      image,
    });

    // Sauvegarder le film dans la base de données
    await newMovie.save();
    res.status(201).json({ message: 'Film ajouté avec succès', newMovie });

  } catch (err) {
    res.status(500).json({ message: 'Erreur du serveur', error: err });
  }
});

// Route pour récupérer les détails d'un film
// Route pour récupérer les détails d'un film
router.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }
    res.status(200).json(movie);  // Retourner les informations du film
  } catch (err) {
    res.status(500).json({ message: 'Erreur du serveur', error: err });
  }
});


// Route pour récupérer tous les films
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();  // Récupérer tous les films
    res.status(200).json(movies);
  } catch (err) {
    console.error('Erreur lors de la récupération des films', err);
    res.status(500).json({ message: 'Erreur du serveur', error: err });
  }
});


module.exports = router;
