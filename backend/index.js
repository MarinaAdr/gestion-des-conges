require ('dotenv').config ();
const express = require ('express');
const cors = require ('cors');
const employeeRoutes = require ('./routes/employeeRoutes');
const authRoutes = require ('./routes/authRoutes');
const path = require('path');
const congeRoutes = require('./routes/congeRoutes');

const app = express ();

// Middleware
app.use (cors ());
app.use (express.json ());

// Middleware pour les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use ('/api/auth', authRoutes);
app.use ('/api/employees', employeeRoutes);
app.use('/api/conges', congeRoutes);

// Route de test API
app.get ('/api/test', (req, res) => {
  res.json ({ message: 'API is working' });
});

// Gestion des erreurs globale
app.use ((err, req, res, next) => {
  console.error (err.stack);
  res.status (500).json ({
    success: false,
    message: 'Une erreur est survenue sur le serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 8080;
app.listen (PORT, () => {
  console.log (`Serveur démarré sur le port ${PORT}`);
});

app.use(cors({
  origin: 'https://gestion-des-conges-tn8p.vercel.app',
  credentials: true
}));
