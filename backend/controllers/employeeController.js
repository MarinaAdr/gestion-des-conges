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
