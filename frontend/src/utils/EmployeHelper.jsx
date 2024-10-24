import axios from "axios";
export const fetchDepartements = async () => {
    let departement 
    try {
      const response = await axios.get('http://localhost:8080/api/departement', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        departement = response.data.departement
      
      }
    } catch (error) {
      const messageErreur = error.response?.data?.error || 'Erreur lors du chargement des départements';
      alert(messageErreur);
    }
    return departement
  };

