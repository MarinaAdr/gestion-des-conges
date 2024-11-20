require ('dotenv').config ();
const express = require ('express');
const cors = require ('cors');
const employeeRoutes = require ('./routes/employeeRoutes');

const app = express ();

// Middleware
app.use (cors ());
app.use (express.json ());


app.use ('/api/employees', employeeRoutes);

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
