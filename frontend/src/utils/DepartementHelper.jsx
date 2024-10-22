import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name: "Id",
        selector: (row) => row.sno
    },
    {
        name: "Nom département ",
        selector: (row) => row.nom_departement
    },
    {
        name: "Action ",
        selector: (row) => <DepartementButton _id={row._id}/>
    },
]

export const DepartementButton = ({_id, onSupprimerDepartement}) => {
    const navigate = useNavigate()

    const handleSupprimer = async(id) => {
        const confirm = window.confirm('Confirmer la suppression?')
        if (confirm) {
            
        try {
            const response = await axios.delete(
              `http://localhost:8080/api/departement/${_id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }
            )
            if (response.data.success) {
                onSupprimerDepartement(id)
            }
          } catch (error) {
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error)
            }
          }
        }
    }
    return (
        <div className="flex space-x-3">
            <button className="px-2 py-1 bg-blue-500 text-white rounded"
            onClick={() => navigate(`/admin-dashboard/departements/${_id}`)}>Editer</button>
            <button className="px-2 py-1 bg-red-500 text-white rounded ml-2"
            onClick={handleSupprimer}>Supprimer</button>
        </div>
    )
}