//index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // ✅ Importation de cors
const axios = require('axios')
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const commentRoutes = require('./routes/comments');
const movieRoutes = require('./routes/movieRoutes');
const Movie = require('./models/movie')  // Importer les routes de commentaires

dotenv.config();
const app = express();

// Middleware pour analyser les corps de requêtes JSON
app.use(express.json());
app.use(cors());  // ✅ Utilisation de cors

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connecté avec succès"))
  .catch((err) => console.log("Erreur de connexion MongoDB:", err));

// Utiliser les routes d'inscription et de connexion
app.use('/api', registerRoute);
app.use('/api', loginRoute);

// Utiliser les routes de commentaires
app.use('/api', commentRoutes); 
app.use('/api', movieRoutes ); // Ici, vous faites le lien avec les routes de commentaires

app.post('/api/v1/predict', async (req, res) => {
  console.log("📩 Requête reçue sur /api/v1/predict avec body :", req.body);

  if (!req.body || !req.body.text || typeof req.body.text !== 'string') {
    return res.status(400).json({ error: "Le champ 'text' est requis et doit être une string." });
  }

  try {
    const response = await axios.post(
      'https://g2-sentiment-analysis-844747804346.us-central1.run.app/api/v1/predict',
      JSON.stringify(req.body),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    // Log de la réponse brute pour mieux comprendre ce qui arrive
    console.log("✅ Réponse de l'API externe :", response.status, response.data);

    if (response.status !== 200) {
      return res.status(500).json({
        error: 'Erreur de l\'API externe',
        message: response.statusText,
        details: response.data,
      });
    }

    res.json(response.data);
  } catch (error) {
    console.error("❌ Erreur de proxy :", error.response?.status, error.response?.statusText, error.response?.data);

    // Log de la réponse détaillée de l'erreur
    if (error.response) {
      console.log("💥 Détails de l'erreur de l'API externe :", error.response.data);
    }

    res.status(500).json({
      error: 'Erreur de proxy',
      status: error.response?.status || 500,
      message: error.response?.statusText || 'Internal Server Error',
      details: error.response?.data || 'Aucun détail supplémentaire disponible',
    });
  }
});

// Route pour récupérer les détails d'un film et ses commentaires
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('comments');
    if (!movie) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du film', error: err });
  }
});

// Route pour récupérer les commentaires d'un film spécifique
app.get('/api/comments/:movieId', async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: req.params.movieId }).populate('userId');
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires', error: err });
  }
});



// Lancer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
