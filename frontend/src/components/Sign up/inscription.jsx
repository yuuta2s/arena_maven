import React from 'react'
import img from '../../assets/Vecteur.svg'
import style from '../../assets/style.css'

const initialValues = {
  nom: '',
  prenom: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function Inscription() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lime-900 text-white ">
    <div>
       <h1 className="text-6xl ">Creation de compte</h1>
      <img
        src={img}
        alt="Vecteur rectangle"
        width={400}
        className="flex items-center justify-center bigDisplay'"
      />
    </div>
    </div>
  )
}

export default Inscription
