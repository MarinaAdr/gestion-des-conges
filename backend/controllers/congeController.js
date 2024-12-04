const pool = require('../config/db.config');

// Définir les statuts possibles comme constantes
const CONGE_STATUS = {
  EN_ATTENTE: 'en_attente',
  APPROUVE: 'approuve',
  REFUSE: 'refuse'
};

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
        'INSERT INTO conges (user_id, date_debut, date_fin, motif, statut, date_creation) VALUES (?, ?, ?, ?, ?, NOW())',
        [user_id, date_debut, date_fin, motif, CONGE_STATUS.EN_ATTENTE]
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
      const [conges] = await pool.query(`
        SELECT c.*, u.nom, u.prenom 
        FROM conges c
        JOIN users u ON c.user_id = u.id 
        ORDER BY c.date_creation DESC
      `);
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

    // Vérifier si le statut est valide
    if (!Object.values(CONGE_STATUS).includes(statut)) {
      return res.status(400).json({
        success: false,
        message: 'Statut invalide. Les statuts possibles sont : en_attente, approuve, refuse'
      });
    }

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
  },

  // Obtenir les statuts possibles
  getStatuts: async (req, res) => {
    try {
      res.status(200).json({ 
        success: true, 
        data: CONGE_STATUS 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la récupération des statuts' 
      });
    }
  },

  getCongesByUserAndStatus: async (req, res) => {
    const { userId, statut } = req.params;
    
    console.log('Params reçus:', { userId, statut }); // Log des paramètres
    console.log('Statuts valides:', CONGE_STATUS); // Log des statuts valides

    // Vérifier si le statut est valide
    if (!Object.values(CONGE_STATUS).includes(statut)) {
      console.log('Statut invalide détecté'); // Log en cas de statut invalide
      return res.status(400).json({
        success: false,
        message: 'Statut invalide. Les statuts possibles sont : en_attente, approuve, refuse'
      });
    }

    try {
      const query = 'SELECT * FROM conges WHERE user_id = ? AND statut = ? ORDER BY date_creation DESC';
      console.log('Exécution de la requête:', query, [userId, statut]); // Log de la requête

      const [conges] = await pool.query(query, [userId, statut]);
      console.log('Résultats trouvés:', conges.length); // Log du nombre de résultats

      res.status(200).json({ success: true, data: conges });
    } catch (error) {
      console.error('Erreur détaillée:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la récupération des congés par statut' 
      });
    }
  },

  getUsersWithConges: async (req, res) => {
    try {
      const [users] = await pool.query(`
        SELECT DISTINCT u.id, u.nom, u.prenom 
        FROM users u
        JOIN conges c ON u.id = c.user_id
        ORDER BY u.nom, u.prenom
      `);
      
      res.status(200).json({ 
        success: true, 
        data: users 
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la récupération des utilisateurs avec des congés' 
      });
    }
  }
};

module.exports = congeController;