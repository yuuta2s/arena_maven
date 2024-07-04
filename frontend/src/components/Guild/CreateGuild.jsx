import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ModalGuild from '@components/Modal/ModalGuild';

export default function CreateGuild() {
  const [showModal, setShowModal] = useState(false);
  const [guildDetails, setGuildDetails] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      image: Yup.mixed().required('Required'),
    }),
    onSubmit: async (values) => {
      console.log('Submitting form with values:', values);

      const data = new FormData();
      data.append('name', values.name);
      data.append('description', values.description);
      data.append('image', values.image);

      // Retrieve and decode the token to get the user ID
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      let creatorId;
      try {
        // Decode the token to get user ID
        const tokenPayload = token.split('.')[1];
        const decodedToken = JSON.parse(atob(tokenPayload));
        creatorId = decodedToken.sub.id;
        if (!creatorId) {
          throw new Error('User ID not found in token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        return;
      }

      data.append('creator_id', creatorId);

      try {
        // Send POST request to create guild
        const response = await axios.post('http://localhost:5000/guild', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });
        console.log('Guild created successfully:', response.data);
        setGuildDetails(response.data); // Store guild details
        setShowModal(true); // Display modal after successful creation
      } catch (error) {
        console.error('Error creating guild:', error.response?.data || error.message);
      }
    },
  });

  // Fonction pour rejoindre une guilde
  const handleJoinGuild = async (guildId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Récupérez l'ID de l'utilisateur depuis localStorage

      // Envoyez la requête POST pour rejoindre la guilde avec `userId` dans le corps
      await axios.post(`http://localhost:5000/guild/${guildId}/join`, { userId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Mettre à jour l'état ou effectuer d'autres actions après l'inscription
    } catch (error) {
      console.error('Error joining guild:', error);
    }
  };

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-primary rounded-xl m-5 p-5 max-w-3xl mx-auto flex flex-wrap justify-center items-center"
      >
        <div className="w-full m-2">
          <label htmlFor="name">Guild Name</label>
          <input
            className="w-full bg-white p-1 rounded-md"
            type="text"
            id="name"
            name="name"
            placeholder="Name.."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="w-full m-2">
          <label htmlFor="description">Guild Description</label>
          <textarea
            className="w-full min-h-16 bg-white p-1 rounded-md"
            id="description"
            name="description"
            placeholder="Description.."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500">{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="w-full m-2">
          <label htmlFor="image">Guild Image</label>
          <input
            className="w-full"
            type="file"
            id="image"
            accept=".jpg, .jpeg, .png, .gif, .webp"
            name="image"
            onChange={(event) => {
              formik.setFieldValue('image', event.currentTarget.files[0]);
            }}
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500">{formik.errors.image}</div>
          ) : null}
        </div>
        <input
          className="bg-primary hover:bg-secondary text-2xl text-white font-bold py-2 px-4 border-b-4 border border-secondary hover:border-tertiary rounded"
          type="submit"
          value="Submit"
        />
        <ModalGuild showModal={showModal} setShowModal={setShowModal} guildDetails={guildDetails} />
      </form>
    </div>
  );
}

// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import ModalGuild from '@components/Modal/ModalGuild';

// export default function CreateGuild() {
//   const [showModal, setShowModal] = useState(false);
//   const [guildDetails, setGuildDetails] = useState(null);

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       description: '',
//       image: null,
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required('Required'),
//       description: Yup.string().required('Required'),
//       image: Yup.mixed().required('Required'),
//     }),
//     onSubmit: async (values) => {
//       console.log('Submitting form with values:', values);

//       const data = new FormData();
//       data.append('name', values.name);
//       data.append('description', values.description);
//       data.append('image', values.image);

//       // Retrieve and decode the token to get the user ID
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('Token not found in local storage');
//         return;
//       }

//       let creatorId;
//       try {
//         // Decode the token to get user ID
//         const tokenPayload = token.split('.')[1];
//         const decodedToken = JSON.parse(atob(tokenPayload));
//         creatorId = decodedToken.sub.id;
//         if (!creatorId) {
//           throw new Error('User ID not found in token');
//         }
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         return;
//       }

//       data.append('creator_id', creatorId);

//       try {
//         // Send POST request to create guild
//         const response = await axios.post('http://localhost:5000/guild', data, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${token}`
//           },
//         });
//         console.log('Guild created successfully:', response.data);
//         setGuildDetails(response.data); // Store guild details
//         setShowModal(true); // Display modal after successful creation
//       } catch (error) {
//         console.error('Error creating guild:', error.response?.data || error.message);
//       }
//     },
//   });

//   return (
//     <div>
//       <form
//         onSubmit={formik.handleSubmit}
//         className="bg-primary rounded-xl m-5 p-5 max-w-3xl mx-auto flex flex-wrap justify-center items-center"
//       >
//         <div className="w-full m-2">
//           <label htmlFor="name">Guild Name</label>
//           <input
//             className="w-full bg-white p-1 rounded-md"
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Name.."
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.name}
//           />
//           {formik.touched.name && formik.errors.name ? (
//             <div className="text-red-500">{formik.errors.name}</div>
//           ) : null}
//         </div>
//         <div className="w-full m-2">
//           <label htmlFor="description">Guild Description</label>
//           <textarea
//             className="w-full min-h-16 bg-white p-1 rounded-md"
//             id="description"
//             name="description"
//             placeholder="Description.."
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.description}
//           />
//           {formik.touched.description && formik.errors.description ? (
//             <div className="text-red-500">{formik.errors.description}</div>
//           ) : null}
//         </div>
//         <div className="w-full m-2">
//           <label htmlFor="image">Guild Image</label>
//           <input
//             className="w-full"
//             type="file"
//             id="image"
//             accept=".jpg, .jpeg, .png, .gif, .webp"
//             name="image"
//             onChange={(event) => {
//               formik.setFieldValue('image', event.currentTarget.files[0]);
//             }}
//           />
//           {formik.touched.image && formik.errors.image ? (
//             <div className="text-red-500">{formik.errors.image}</div>
//           ) : null}
//         </div>
//         <input
//           className="bg-primary hover:bg-secondary text-2xl text-white font-bold py-2 px-4 border-b-4 border border-secondary hover:border-tertiary rounded"
//           type="submit"
//           value="Submit"
//         />
//       </form>
//       {showModal && <ModalGuild showModal={showModal} setShowModal={setShowModal} guildDetails={guildDetails} />}
//     </div>
//   );
// }