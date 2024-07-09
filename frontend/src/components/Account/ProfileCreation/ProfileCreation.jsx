import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img from '../../../assets/iconProfile.jpg';

function ProfileCreation() {
  const [user, setUser] = useState(null); // Initialisez à null pour vérifier la disponibilité des données
  const [isEditing, setIsEditing] = useState(false); // State pour gérer l'édition du profil
  const [formData, setFormData] = useState({}); // State pour gérer les données du formulaire
  const [file, setFile] = useState(null); // State pour gérer le fichier de la photo de profil

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user');
        const users = response.data;
        if (users && users.length > 0) {
          setUser(users[0]); // Sélectionnez le premier utilisateur du tableau
          setFormData(users[0]); // Initialisez le formulaire avec les données utilisateur
          console.log('user', users[0]);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Met à jour le fichier de la photo de profil
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/user/${user.id}`, formData);
      setUser(response.data);
      setIsEditing(false);
      console.log('User updated:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user); // Réinitialisez le formulaire avec les données originales
  };

  if (!user) {
    return <div>Loading...</div>; // Affichez un indicateur de chargement si les données ne sont pas encore disponibles
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bigShouldersDisplay text-white p-4">
      <div className="relative flex flex-col items-center w-full max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-8xl">
        <article className="flex flex-col items-center absolute -mt-20">
          <h1 className="text-4xl text-black mb-10">Information du compte</h1>
        </article>
        <div className="flex flex-col md:flex-row gap-4 md:gap-20">
          <div className="p-7 rounded-lg bg-black flex flex-col items-center w-full md:w-1/3">
            <h1>Informations personnelles</h1>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <label>
                  Nom d'utilisateur:
                  <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <label>
                  Email:
                  <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                  Mot de passe:
                  <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <label>
                  Photo de profil:
                  <input type="file" name="profilePicture" onChange={handleFileChange} />
                </label>
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={handleCancel}>Annuler</button>
              </form>
            ) : (
              <>
                <p>Nom d'utilisateur: {user.username}</p>
                <hr className="w-full bg-white" />
                <p>Email: {user.email}</p>
                <hr className="w-full bg-white" />
                <p>Mot de passe: {user.password}</p>
                <hr className="w-full bg-white" />
                <p>Rôle: {user.role}</p>
                <hr className="w-full bg-white" />
                <button onClick={handleEdit}>Éditer</button>
              </>
            )}
          </div>
          <div className="p-2 rounded-lg bg-black flex flex-col items-center w-full md:w-1/3">
            <section>
              <p>Photo de profil</p>
              <img src={user.profil_picture || img} alt="Profile" className="rounded-full" />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCreation;
