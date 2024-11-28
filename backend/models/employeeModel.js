const db = require('../config/db.config');
const bcrypt = require('bcryptjs');

const Employee = {
  // Créer un employé
  create: async (employeeData) => {
    try {
      const hashedPassword = await bcrypt.hash(employeeData.password, 10);
      const [result] = await db.query(
        `INSERT INTO users (nom, prenom, email, password, role, date_embauche, poste, solde_conge, image, contact) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          employeeData.nom,
          employeeData.prenom,
          employeeData.email,
          hashedPassword,
          employeeData.role || 'EMPLOYEE',
          employeeData.date_embauche,
          employeeData.poste,
          employeeData.solde_conge,
          employeeData.image,
          employeeData.contact
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
        `SELECT id, nom, prenom, email, role, date_embauche, poste, solde_conge, image, contact
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
        `SELECT id, nom, prenom, email, role, date_embauche, poste, solde_conge, image, contact
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
      // Créer un objet avec uniquement les champs non-vides
      const updateFields = {};
      const validFields = [
        'nom', 
        'prenom', 
        'role', 
        'date_embauche', 
        'poste',
        'solde_conge',
        'image',
        'contact'
      ];

      // Traitement spécial pour l'email
      if (employeeData.email && employeeData.email.trim() !== '') {
        updateFields.email = employeeData.email;
      }

      // Traiter les autres champs
      validFields.forEach(field => {
        if (employeeData[field] !== undefined && employeeData[field] !== null) {
          updateFields[field] = employeeData[field];
        }
      });

      // Si aucun champ à mettre à jour
      if (Object.keys(updateFields).length === 0) {
        return { affectedRows: 0 };
      }

      // Construire la requête dynamiquement
      const setClause = Object.keys(updateFields)
        .map(key => `${key} = ?`)
        .join(', ');
      
      const query = `UPDATE users SET ${setClause} WHERE id = ?`;
      const params = [...Object.values(updateFields), id];

      const [result] = await db.query(query, params);
      return result;
    } catch (error) {
      console.error('Erreur dans la mise à jour:', error);
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
        `SELECT id, nom, prenom, email, role, date_embauche, poste, solde_conge, image, contact
         FROM users 
         WHERE nom LIKE ? OR prenom LIKE ? OR email LIKE ?`,
        [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Ajouter cette méthode au modèle Employee
  updateCredentials: async (id, updates) => {
    try {
      console.log('Mise à jour pour ID:', id);
      console.log('Updates dans le modèle:', updates);

      // Si un mot de passe est fourni, le hasher
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }

      // Construire la requête SQL dynamiquement
      const updateFields = [];
      const values = [];
      
      Object.keys(updates).forEach(key => {
        updateFields.push(`${key} = ?`);
        values.push(updates[key]);
      });
      
      // Ajouter l'ID à la fin des valeurs
      values.push(id);

      const sql = `
        UPDATE users 
        SET ${updateFields.join(', ')} 
        WHERE id = ?
      `;

      console.log('Requête SQL:', sql);
      console.log('Valeurs:', values);

      const [result] = await db.query(sql, values);
      return result;
    } catch (error) {
      console.error('Erreur dans updateCredentials:', error);
      throw error;
    }
  }
};

module.exports = Employee; 