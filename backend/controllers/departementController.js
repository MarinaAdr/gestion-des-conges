import Departement from "../models/Departement.js";

const getDepartements = async (req, res) => {
    try {
        const departements = await Departement.find()
        return res.status(200).json({success: true, departements})
    } catch (error) {
        return res.status(500).json({success: false, error: "Get département serveur erreur"})
    }
}

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

const getDepartement = async(req, res) =>{
    try {
        const {id} = req.params;
        const departement = await Departement.find({_id: id})
        return res.status(200).json({success: true, departement})
    } catch (error) {
        return res.status(500).json({success: false, error: " le département serveur erreur"})
        
    }
}
const modifierDepartement = async(req, res) =>{
    try {
        const {id} = req.params;
        const {nom_departement, description} = req.body;
        const modifierDepartement = await Departement.findByIdAndUpdate({_id: id}, {
            nom_departement,
            description 
        })
        return res.status(200).json({success: true, modifierDepartement})
    } catch (error) {
        return res.status(500).json({success: false, error: "Modifier le département serveur erreur"})
        
    }
}

export {ajoutDepartement, getDepartements, getDepartement, modifierDepartement}