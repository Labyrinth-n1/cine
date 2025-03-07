const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Définir un schéma pour l'utilisateur
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Garantir que l'email soit unique
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // Les rôles possibles
    default: 'user',  // Rôle par défaut
  },
});

// Crypter le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Ne pas crypter si le mot de passe n'est pas modifié
  
  try {
    const salt = await bcrypt.genSalt(10);  // Créer un salt de 10 tours
    this.password = await bcrypt.hash(this.password, salt);  // Crypter le mot de passe
    next();
  } catch (err) {
    next(err);
  }
});

// Méthode pour comparer les mots de passe (utilisée lors de la connexion)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Vérifier si le modèle User est déjà défini avant de le créer
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Exporter le modèle
module.exports = User;
