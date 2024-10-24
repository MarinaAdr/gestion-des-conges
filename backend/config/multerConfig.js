import multer from 'multer';
import path from 'path';

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où les images seront stockées
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nom de fichier unique
    }
});

const upload = multer({ storage: storage });

export default upload;
