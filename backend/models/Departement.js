import mongoose from "mongoose";

const departementSchema = new mongoose.Schema({
    nom_departement: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Departement = mongoose.model("Departement", departementSchema);

export default Departement;