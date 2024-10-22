import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const DepartementButton = ({ _id, onSupprimerDepartement }) => {
    const navigate = useNavigate(); 

    const handleSupprimer = async () => {
        const confirm = window.confirm('Confirmer la suppression?');
        if (confirm) {
            try {
                const response = await axios.delete(
                    `http://localhost:8080/api/departement/${_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                if (response.data.success) {
                    onSupprimerDepartement(_id);  
                } else {
                    alert('Erreur lors de la suppression.');
                }
            } catch (error) {
                if (error.response && error.response.data && !error.response.data.success) {
                    alert(error.response.data.error);
                } else {
                    console.error('Erreur inconnue:', error);
                    alert('Une erreur s\'est produite.');
                }
            }
        }
    };

    return (
        <div className="flex space-x-3">
            <button 
                className="px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/departements/${_id}`)}  
            >
                Editer
            </button>
            <button 
                className="px-2 py-1 bg-red-500 text-white rounded ml-2"
                onClick={handleSupprimer}  
            >
                Supprimer
            </button>
        </div>
    );
};
