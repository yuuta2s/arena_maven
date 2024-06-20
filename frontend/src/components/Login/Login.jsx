import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import img from "../../assets/Vecteur.svg";
import { Link } from "react-router-dom"; // Modifié ici
import '../../assets/style.css'
// import axios from 'axios';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate(); // Modifié ici
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  // const handleSubmit = async (values) => {
  //   try {
  //     const response = await axios.post('http://localhost:5001/user', values);
  //     if (response.status === 201) {
  //       const userCheckResponse = await axios.post('http://localhost:5001/user', { email: values.email });
  //       if (userCheckResponse.status === 200 && userCheckResponse.data.exists) {
  //         navigate('/dashboard'); 
  //       } else {
  //         throw new Error('Utilisateur non créé');
  //       }
  //     } else {
  //       throw new Error('Échec de la connexion de l\'utilisateur');
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de la recuperation de l\'utilisateur:', error);
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lime-900 text-white p-4">
      <div className="relative flex flex-col items-center w-full max-w-md "> 
        <div className="relative w-full flex items-center justify-center"> 
          <div className="flex flex-col items-center mt-15 ">
            <h1 className="text-4xl lg:text-7xl bigDisplay">Se connecter</h1>
            <img
              src={img}
              alt="Vecteur rectangle"
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-md sm:max-w-xl mt-10">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={yup.object({
            email: yup
              .string()
              .email("Email invalide")
              .required("L'email est requis"),
            password: yup
              .string()
              .min(8, "Le mot de passe doit contenir au moins 8 caractères")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre"
              ),
          })}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              <div className="bg-black p-3 mb-5 rounded-lg">
                <label htmlFor="email" className="block mb-2 bigShouldersDisplay">
                  Email / nom d'utilisateur
                </label>
                <Field
                  name="email"
                  id="email"
                  placeholder="Entrez votre email"
                  className="w-full p-2 text-black rounded-lg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 bigShouldersDisplay"
                />
              </div>
              <div className="bg-black p-3 mb-5 rounded-lg relative">
                <label
                  htmlFor="password"
                  className="block mb-2 bigShouldersDisplay"
                >
                  Mot de passe
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Entrez votre mot de passe"
                  className="w-full p-1 text-black password-field rounded-r-3xl "
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 bigShouldersDisplay mt-2"
                />
                <label htmlFor="password forgot" className="bigShouldersDisplay flex justify-end underline mt-2">Mot de passe oublié ?</label>
              </div>
              <button 
              type="submit"
               className="bg-black text-white p-2 w-full rounded-lg bigShouldersDisplay"
            >
              Envoyé
            </button>
              
              <Link
                to="/SignUp"
                className="text-white underline flex justify-center mt-4 bigShouldersDisplay"
              >
                Vous n'avez pas de compte ? Inscrivez-vous
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default Login;