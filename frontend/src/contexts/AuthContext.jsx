import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        } else {
          // Si l'un des deux manque, on nettoie tout
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    if (!userData) {
      throw new Error('User data is required for login');
    }
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUser = async (userData) => {
    try {
      const formData = new FormData();
      
      console.log('userData reçu:', userData);  // Debug

      // Vérifier et ajouter l'image
      if (userData.image) {
        console.log('Image trouvée:', userData.image);  // Debug
        formData.append('photo', userData.image);
      }

      // Ajouter email et contact seulement s'ils sont différents des valeurs actuelles
      if (userData.email && userData.email !== user.email) {
        formData.append('email', userData.email);
      }
      if (userData.contact && userData.contact !== user.contact) {
        formData.append('contact', userData.contact);
      }

      // Debug - vérifier le contenu du FormData
      for (let pair of formData.entries()) {
        console.log('FormData contient:', pair[0], pair[1]);
      }

      // Vérifier si le FormData n'est pas vide
      if ([...formData.entries()].length === 0) {
        return { 
          success: false, 
          error: 'Aucune modification à envoyer' 
        };
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/employees/${user.id}/update-credentials`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      if (response.data?.success) {
        const updatedUser = response.data.data;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true, data: updatedUser };
      }
    } catch (error) {
      console.error('Erreur détaillée:', error.response?.data);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de la mise à jour du profil' 
      };
    }
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);