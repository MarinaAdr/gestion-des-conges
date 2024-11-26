const Employee = require ('../models/employeeModel');

exports.create = async (req, res) => {
  try {
    // Validation des données requises
    const requiredFields = [
      'nom',
      'prenom',
      'email',
      'password',
      'date_embauche',
      'poste',
      'solde_conge',
      'image',
      'contact'
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status (400).json ({
          success: false,
          message: `Le champ ${field} est requis`,
        });
      }
    }

    const result = await Employee.create (req.body);
    res.status (201).json ({
      success: true,
      message: 'Employé créé avec succès',
      data: {id: result.insertId},
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status (400).json ({
        success: false,
        message: 'Cet email est déjà utilisé',
      });
    }
    res.status (500).json ({
      success: false,
      message: "Erreur lors de la création de l'employé",
      error: error.message,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const {search} = req.query;
    const employees = search
      ? await Employee.search (search)
      : await Employee.findAll ();

    res.json ({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status (500).json ({
      success: false,
      message: 'Erreur lors de la récupération des employés',
      error: error.message,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const employee = await Employee.findById (req.params.id);
    if (!employee) {
      return res.status (404).json ({
        success: false,
        message: 'Employé non trouvé',
      });
    }
    res.json ({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status (500).json ({
      success: false,
      message: "Erreur lors de la récupération de l'employé",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Employee.update (req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status (404).json ({
        success: false,
        message: 'Employé non trouvé',
      });
    }
    res.json ({
      success: true,
      message: 'Employé mis à jour avec succès',
    });
  } catch (error) {
    res.status (500).json ({
      success: false,
      message: "Erreur lors de la mise à jour de l'employé",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Employee.delete (req.params.id);
    if (result.affectedRows === 0) {
      return res.status (404).json ({
        success: false,
        message: 'Employé non trouvé',
      });
    }
    res.json ({
      success: true,
      message: 'Employé supprimé avec succès',
    });
  } catch (error) {
    res.status (500).json ({
      success: false,
      message: "Erreur lors de la suppression de l'employé",
      error: error.message,
    });
  }
};

exports.updateCredentials = async (req, res) => {
  try {
    const updates = {};
    
    // Vérifier si une nouvelle photo est fournie
    if (req.file) {
      updates.image = req.file.filename;
      console.log('Image reçue:', req.file);
    }

    // Ajouter les autres champs autorisés
    const allowedFields = ['email', 'contact'];
    allowedFields.forEach(field => {
      if (req.body[field]) {
        updates[field] = req.body[field];
      }
    });

    // Si aucune mise à jour n'est nécessaire
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucune modification fournie'
      });
    }

    console.log('Updates à appliquer:', updates);

    const result = await Employee.updateCredentials(req.params.id, updates);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Employé non trouvé'
      });
    }

    // Récupérer l'employé mis à jour
    const updatedEmployee = await Employee.findById(req.params.id);

    // Ajouter l'URL complète de l'image
    if (updatedEmployee.image) {
      updatedEmployee.imageUrl = `${process.env.API_URL}/uploads/${updatedEmployee.image}`;
    }

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: updatedEmployee
    });
  } catch (error) {
    console.error('Erreur complète:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour des credentials',
      error: error.message
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    let updateData = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      role: req.body.role,
      date_embauche: req.body.date_embauche,
      solde_conge: req.body.solde_conge
    };

    // Si une nouvelle image est téléchargée
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      console.log('Employé non trouvé:', employeeId);
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    console.log('Employé mis à jour:', updatedEmployee);
    res.status(200).json(updatedEmployee);
    
  } catch (error) {
    console.error('Erreur détaillée:', error);
    res.status(500).json({ 
      message: "Erreur lors de la mise à jour de l'employé",
      error: error.message 
    });
  }
};
