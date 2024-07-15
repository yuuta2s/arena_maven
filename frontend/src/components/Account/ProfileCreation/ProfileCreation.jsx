import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img from '../../../assets/iconProfile.jpg';

function ProfileCreation() {
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user');
        const users = response.data;
        if (users && users.length > 0) {
          setUser(users[0]);
          setNewUsername(users[0].username);
          setNewEmail(users[0].email);
          setNewPassword('');
          console.log('user', users[0]);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, []);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setNewProfilePicture(file);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleUserInfoSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.error('User is not loaded');
      return;
    }

    const updatedUser = {
      ...user,
      username: newUsername,
      email: newEmail,
      password: newPassword,
    };

    try {
      const response = await axios.put(`http://localhost:5000/user/${user.id}`, updatedUser);
      setUser(response.data); // Mettre à jour l'état utilisateur avec la réponse de l'API
      console.log('User info updated successfully');
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const handleProfilePictureSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.error('User is not loaded');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', newProfilePicture);

    try {
      const response = await axios.put(`http://localhost:5000/user/${user.id}/profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data); // Mettre à jour l'état utilisateur avec la réponse de l'API
      console.log('Profile picture updated successfully');
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bigShouldersDisplay text-white p-4">
      <div className="relative flex flex-col items-center w-full max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-8xl">
        <article className="flex flex-col items-center absolute -mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Informations du compte</h2>
        </article>
        <div className="flex flex-col md:flex-row gap-4 md:gap-20">
          <div className="p-7 rounded-lg bg-black flex flex-col items-center w-full md:w-1/3">
            <h1>Informations personnelles</h1>
            <form onSubmit={handleUserInfoSubmit}>
              <label>
                Nouveau nom d'utilisateur:
                <input
                  type="text"
                  color="black"
                  value={newUsername}
                  onChange={handleUsernameChange}
                />
              </label>
              <hr className="w-full bg-white" />
              <label>
                Nouvel email:
                <input
                  type="email"
                  value={newEmail}
                  onChange={handleEmailChange}
                />
              </label>
              <hr className="w-full bg-white" />
              <label>
                Nouveau mot de passe:
                <input
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
              </label>
              <hr className="w-full bg-white" />
              <button type="submit">Mettre à jour les informations</button>
            </form>
            <hr className="w-full bg-white" />
            <p>Rôle: {user.role}</p>
            <hr className="w-full bg-white" />
          </div>
          <div className="p-2 rounded-lg bg-black flex flex-col items-center w-full md:w-1/3">
            <section>
              <img src={user.profilePicture || img} alt="Profile" className="rounded-full mb-4" />
              <form onSubmit={handleProfilePictureSubmit}>
                <p>Nouvelle photo de profil</p>
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                <button type="submit">Mettre à jour la photo de profil</button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCreation;
