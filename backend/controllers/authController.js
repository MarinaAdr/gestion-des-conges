import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne ({email});
    if (!user) {
      res
        .status (404)
        .json ({success: false, error: 'Utilisateur non trouvé!'});
    }
    const isMatch = await bcrypt.compare (password, user.password);
    if (!isMatch) {
      res
        .status (404)
        .json ({success: false, error: 'Mot de passe incorrect!'});
    }
    const token = jwt.sign (
      {_id: user._id, role: user.role},
      process.env.JWT_KEY,
      {expiresIn: '10d'}
    );
    res
      .status (200)
      .json ({
        success: true,
        token,
        user: {_id: user._id, name: user.name, role: user.role},
      });
  } catch (error) {
    res.status(500).json({success: false, error: 'Erreur serveur'})
  }
};

export {login};
