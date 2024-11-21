const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db.config');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'email existe (Modifié pour MySQL)
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Email ou mot de passe incorrect"
            });
        }

        const user = users[0];

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Email ou mot de passe incorrect"
            });
        }

        // Générer le token JWT
        const token = jwt.sign(
            { 
                id: user.id,
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Retourner l'utilisateur sans le mot de passe
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            success: true,
            message: "Connexion réussie",
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la connexion"
        });
    }
};

module.exports = {
    login
};