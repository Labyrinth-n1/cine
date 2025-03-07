const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },  // Lien vers le film
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Lien vers l'utilisateur
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
