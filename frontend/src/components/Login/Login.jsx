import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import img from "../../assets/Vecteur.svg";
import { Link } from "react-router-dom";
import '../../assets/style.css'

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lime-900 text-white ">
      <div className="relative flex flex-col items-center"> 
        <div className="relative"> 
        <h1 className="text-xs bigDisplay top-0 left-0 right-0 text-center mb-5 ml-10">Se connecter</h1>
        </div>
          <img
            src={img}
            alt="Vecteur rectangle"
            className="w-full h-full -mt-14 justify-start"
          />
         
      </div>
      <div className="w-full max-w-xs mt-10 ">
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
              .required("Le mot de passe est requis")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre"
              ),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              <div className="bg-black p-3 mb-5 ">
                <label htmlFor="email" className="block mb-2 bigShouldersDisplay">
                  Email
                </label>
                <Field
                  name="email"
                  id="email"
                  placeholder="Entrez votre email"
                  className="w-full p-2 text-black password-field rounded-r-3xl "
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
              <div className="bg-black p-2 relative mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 rounded-full bigShouldersDisplay"
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
                  className="size-6"
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
                  className="text-lg text-red-500 bigShouldersDisplay"
                />
                <label htmlFor="Pasword forgot" className="bigShouldersDisplay flex justify-end underline">Mot de passe oublié ?</label>
              </div>
              <div className="flex items-center">
              </div>
              <button type="submit" className="bg-black text-white p-2 flex rounded bigShouldersDisplay justify-end ml-36">
                Envoyé
              </button>
              <Link
                to="/inscription"
                className="text-white underline  flex p-4 text-center bigShouldersDisplay"
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

