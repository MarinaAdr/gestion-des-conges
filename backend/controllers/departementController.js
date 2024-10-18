import Departement from "../models/Departement.js";

const ajoutDepartement = async(req, res) => {
    try {
        const {nom_departement, description} = req.body;
        const newDep = new Departement ({
            nom_departement,
            description
        })
        await newDep.save()
        return res.status(200).json({success: true, departement: newDep})
        
    } catch (error) {
        return res.status(500).json({success: false, error: "Ajout de département serveur erreur"})
        
    }
}

export {ajoutDepartement}