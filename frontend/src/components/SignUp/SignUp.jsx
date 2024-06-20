import {useState} from 'react'
import img from '../../assets/Vecteur.svg'
// import '../../assets/style.css'
import { Formik, Form, Field, ErrorMessage }from 'formik'
import * as yup from "yup";

const initialValues = {
  "nom d'utilisateur": '',
  email: '',
  password: '',
  confirmPassword: '',
  profilPicture: ''
}


function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lime-900 text-white ">
    <div>
       <h1 className="text-6xl bigShouldersDisplay">Creation de compte</h1>
      <img
        src={img}
        alt="Vecteur rectangle"
        width={400}
        className="flex items-center justify-center bigDisplay'"
      />
    </div>
    <div className="w-full max-w-md sm:max-w-xl mt-10">
        <Formik
          initialValues={initialValues}
          validationSchema={yup.object({
            email: yup
              .string()
              .email("Email invalide")
              .required("L'email est requis"),
            password: yup
              .string()
              .min(8, "Le mot de passe doit contenir au moins 8 caractères")
              .required("Le mot de passe est requis"),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form className=" bg-black gap-4">
              <div className="bg-53B84A p-3 mb-5 rounded-lg">
                <label htmlFor="username" className="block mb-2 bigShouldersDisplay">
                  Nom d'utilisateur
                </label>
                <Field
                  name="nom d'utilisateur"
                  id="nom d'utilisateur"
                  placeholder="Entrez votre nom d'utilisateur"
                  className="w-full p-2 text-black rounded-lg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nomdutilisateur}
                />
              </div>
              <div className="bg-black p-3 mb-5 rounded-lg">
                <label htmlFor="email" className="block mb-2 bigShouldersDisplay">Email</label>
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
              <div className="bg-black p-3 mb-5 rounded-lg ">
                <label htmlFor="password" className="block mb-2 bigShouldersDisplay">Mot de passe</label>
                <Field
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre mot de passe"
                  className="w-full p-2 text-black rounded-lg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 bigShouldersDisplay"
                />
                </div>
                <div className="bg-black p-3 mb-5 rounded-lg">
                <label htmlFor="confirmPassword" className="block mb-2 bigShouldersDisplay">Confirmer le mot de passe</label>
                <Field
                  name="confirmPassword"
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmez votre mot de passe"
                  className="w-full p-2 text-black rounded-lg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
              </div>
              <div className="rounded-lg">
                <label htmlFor="profilPicture" className="block mb-2 bigShouldersDisplay">Photo de profil</label>
                <Field
                  name="profilPicture"
                  id="profilPicture"
                  type="file"
                  className="w-full p-2 text-black rounded-lg"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SignUp
