import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartement = () => {
  const { id } = useParams()
  const [departement, setDepartement] = useState({})
  const [depLoading, setDepLoading] = useState(false)
  const navigate = useNavigate()

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
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setDepartement({ ...departement, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `http://localhost:8080/api/departement/${id}`,
        departement,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        navigate('/admin-dashboard/departements');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      {depLoading ? (
        <div className="text-xl font-medium text-violet-600">Chargement...</div>
      ) : (
        <div className="relative w-full max-w-xl">
          {/* Carte de fond violette claire */}
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-violet-100 rounded-xl"></div>
          
          {/* Carte de fond violette foncée */}
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-violet-200 rounded-xl"></div>
          
          {/* Carte principale */}
          <div className="relative bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-center mb-8">
              Modifier département
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="nom_departement"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nom du département
                  </label>
                  <input
                    name="nom_departement"
                    type="text"
                    placeholder="Nom département"
                    value={departement.nom_departement || ''}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    value={departement.description || ''}
                    rows="4"
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                Modifier
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditDepartement