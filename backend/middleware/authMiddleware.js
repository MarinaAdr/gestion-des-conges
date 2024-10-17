import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1]
        if(!token){
            return resizeBy.status(404).json({success: false, error: "Token not Provided!"})
        }
        
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if(!decoded){
            return res.status(404).json({success: false, error: "Token invalide"})
        }
        const user = await User.findById({_id: decoded._id}).select('-password')

        if (!user) {
            return res.status(404).json({success: false, error: 'Utilisateur non trouvé'})
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(500).json({success:false, error: "Erreur serveur"})
    }
}

export default verifyUser