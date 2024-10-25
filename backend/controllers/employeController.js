import Employe from "../models/Employe.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const ajoutEmploye = async(req, res) => {
    const {
        name,
        email,
        employeeId,
        dateNaissance,
        genre,
        situationMatrimoniale,
        designation,
        departement,
        salaire,
        password,
        role
    } = req.body;

    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({success: false, error: "Utilisateur déjà existant "})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        name,
        email,
        password: hashPassword,
        role,
        profileImage: req.file ? req.file.filename : ""
    })
    const savedUser = await newUser.save()
    const newEmployee = new Employe({
        userId: savedUser._id,
        employeeId,
        dateNaissance,
        genre,
        situationMatrimoniale,
        designation,
        departement,
        salaire,
        role

    })
    await newEmployee.save()

}

export {ajoutEmploye, upload}