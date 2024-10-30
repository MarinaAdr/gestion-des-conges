import Employe from "../models/Employe.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const ajoutEmploye = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dateDeNaissance,
            genre,
            situationMatrimoniale,
            designation,
            departement,
            salaire,
            password,
            role
        } = req.body;

        // Vérifiez si les données sont correctement reçues
        console.log(req.body);

        // Vérifiez si l'utilisateur existe déjà
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "Utilisateur déjà existant" });
        }

        // Hash le mot de passe
        const hashPassword = await bcrypt.hash(password, 10);
        
        // Créez le nouvel utilisateur
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        });
        const savedUser = await newUser.save();

        // Créez le nouvel employé
        const newEmployee = new Employe({
            userId: savedUser._id,
            employeeId,
            dateDeNaissance,
            genre,
            situationMatrimoniale,
            designation,
            departement,
            salaire,
            role
        });

        console.log( newEmployee);
        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employé créé" });
    } catch (error) {
        console.error("Erreur lors de l'ajout:", error.message);
        return res.status(500).json({ success: false, message: "Erreur lors de l'ajout" });
    }
};

export { ajoutEmploye, upload };
