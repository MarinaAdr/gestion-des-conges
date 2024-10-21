import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios' // Import de axios

const EditDepartement = () => {
  const { id } = useParams()
  const [departement, setDepartement] = useState({}) // Initialiser avec un objet vide
  const [depLoading, setDepLoading] = useState(false)

  useEffect(() => {
    const fetchDepartements = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:8080/api/departement/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        console.log(response.data)
        if (response.data.success) {
          setDepartement(response.data.departement[0])
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setDepLoading(false)
      }
    }

    fetchDepartements()
  }, [id]) // Ajouter 'id' dans les dépendances

  const handleChange = (e) => {
    const { name, value } = e.target
    setDepartement({ ...departement, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // Empêcher le comportement par défaut du formulaire
    // Logique de soumission à ajouter si besoin
  }

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-[150px] bg-white p-8 rounded-xl shadow-md w-96">
          <div>
            <h2 className="text-2xl font-bold mb-6">Modifier département</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="nom_departement"
                  className="text-m font-medium text-gray-700"
                >
                  Nom du département
                </label>
                <input
                  name="nom_departement"
                  type="text"
                  placeholder="Nom département"
                  value={departement.nom_departement || ''} 
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div className="mt-3">
                <label
                  htmlFor="description"
                  className="block text-m font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={handleChange}
                  value={departement.description || ''} 
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
                  rows="4"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Modifier
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default EditDepartement
