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
      data.append('creator_id', 41); // Assurez-vous que l'ID du créateur est correctement défini

      try {
        const response = await axios.post('http://localhost:5000/guild', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Guild created successfully:', response.data);
        setGuildDetails(response.data); // Stocker les détails de la guilde
        setShowModal(true);
      } catch (error) {
        console.error('Error creating guild:', error);
      }
    },
  });

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