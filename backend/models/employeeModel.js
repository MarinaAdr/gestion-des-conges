const db = require('../config/db.config');
const bcrypt = require('bcryptjs');

const Employee = {
  // Créer un employé
  create: async (employeeData) => {
    try {
      const hashedPassword = await bcrypt.hash(employeeData.password, 10);
      const [result] = await db.query(
        `INSERT INTO users (nom, prenom, email, password, role, date_embauche, poste) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          employeeData.nom,
          employeeData.prenom,
          employeeData.email,
          hashedPassword,
          employeeData.role || 'EMPLOYEE',
          employeeData.date_embauche,
          employeeData.poste
        ]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer tous les employés
  findAll: async () => {
    try {
      const [rows] = await db.query(
        `SELECT id, nom, prenom, email, role, date_embauche, poste 
         FROM users 
         ORDER BY nom ASC`
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer un employé par ID
  findById: async (id) => {
    try {
      const [rows] = await db.query(
        `SELECT id, nom, prenom, email, role, date_embauche, poste 
         FROM users 
         WHERE id = ?`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour un employé
  update: async (id, employeeData) => {
    try {
      let query = `UPDATE users SET 
        nom = ?, 
        prenom = ?, 
        email = ?, 
        role = ?, 
        date_embauche = ?, 
        poste = ?`;
      
      const params = [
        employeeData.nom,
        employeeData.prenom,
        employeeData.email,
        employeeData.role,
        employeeData.date_embauche,
        employeeData.poste
      ];

      // Si un nouveau mot de passe est fourni
      if (employeeData.password) {
        const hashedPassword = await bcrypt.hash(employeeData.password, 10);
        query += `, password = ?`;
        params.push(hashedPassword);
      }

      query += ` WHERE id = ?`;
      params.push(id);

      const [result] = await db.query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Supprimer un employé
  delete: async (id) => {
    try {
      const [result] = await db.query(
        'DELETE FROM users WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Rechercher des employés
  search: async (searchTerm) => {
    try {
      const [rows] = await db.query(
        `SELECT id, nom, prenom, email, role, date_embauche, poste 
         FROM users 
         WHERE nom LIKE ? OR prenom LIKE ? OR email LIKE ?`,
        [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Employee; 