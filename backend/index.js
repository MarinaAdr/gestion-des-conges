const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 8080;

// Mock session data (replace with actual session management later)
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Mock data and functions (replace with your logic)
const verifyAdmin = (req) => req.session && req.session.isAdmin;
const getNotifications = () => 3; // Example function to get notifications count

app.use(express.json());
app.use(express.static('public')); // serve static files like images

// API route for checking if the user is admin and getting notifications
app.get('/api/user-info', (req, res) => {
  const isAdmin = verifyAdmin(req);
  const user = {
    nom: req.session.nom || 'User',
    prenom: req.session.prenom || 'Demo',
  };
  const notificationsCount = isAdmin ? getNotifications() : 0;

  res.json({ isAdmin, user, notificationsCount });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
