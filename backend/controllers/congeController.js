const pool = require('../config/db.config');

const congeController = {
  // Créer une nouvelle demande de congé
  createConge: async (req, res) => {
    const { user_id, date_debut, date_fin, motif } = req.body;

    // Validation des dates
    const dateDebut = new Date(date_debut);
    const dateFin = new Date(date_fin);

    if (dateFin < dateDebut) {
      return res.status(400).json({
        success: false,
        message: 'La date de fin ne peut pas être antérieure à la date de début'
      });
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO conges (user_id, date_debut, date_fin, motif, statut, date_creation) VALUES (?, ?, ?, ?, "en_attente", NOW())',
        [user_id, date_debut, date_fin, motif]
      );

      res.status(201).json({ 
        success: true, 
        message: 'Demande de congé enregistrée avec succès',
        congeId: result.insertId 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de l\'enregistrement de la demande de congé' 
      });
    }
  },

  // Obtenir toutes les demandes de congés
  getAllConges: async (req, res) => {
    try {
      const [conges] = await pool.query('SELECT * FROM conges ORDER BY date_creation DESC');
      res.status(200).json({ success: true, data: conges });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la récupération des congés' 
      });
    }
  },

  // Obtenir les congés d'un utilisateur spécifique
  getCongesByUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const [conges] = await pool.query(
        'SELECT * FROM conges WHERE user_id = ? ORDER BY date_creation DESC',
        [userId]
      );
      res.status(200).json({ success: true, data: conges });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la récupération des congés' 
      });
    }
  },

  // Mettre à jour le statut d'une demande de congé
  updateCongeStatus: async (req, res) => {
    const { congeId } = req.params;
    const { statut } = req.body;

    try {
      const [result] = await pool.query(
        'UPDATE conges SET statut = ? WHERE id = ?',
        [statut, congeId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Demande de congé non trouvée' 
        });
      }

      res.status(200).json({ 
        success: true, 
        message: 'Statut de la demande mis à jour avec succès' 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la mise à jour du statut' 
      });
    }
  }
};

module.exports = congeController;