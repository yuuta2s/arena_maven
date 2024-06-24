import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import Modal from '@components/Modal/Modal';

export default function TournamentRequest() {

  const [showModal, setShowModal] = useState(false);
  const formik = useFormik({
    initialValues: {
      tname: '',
      tdate: '',
      nbPlayer: '2',
      tdescription: '',
      timage: null,
    },
    validationSchema: Yup.object({
      tname: Yup.string().required('Required'),
      tdate: Yup.date().required('Required'),
      nbPlayer: Yup.string().required('Required'),
      tdescription: Yup.string().required('Required'),
      timage: Yup.mixed().required('Required'),
    }),
    onSubmit: async (values) => {
      const data = new FormData();
      data.append('tname', values.tname);
      data.append('tdate', values.tdate);
      data.append('nbPlayer', values.nbPlayer);
      data.append('tdescription', values.tdescription);
      data.append('timage', values.timage);

      try {
        const response = await axios.post('http://localhost:5000/tournament', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Tournament created successfully:', response.data);
        // setShowModal(true)
      } catch (error) {
        console.error('Error creating tournament:', error);
      }
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center sm:max-w-md md:max-w-xl lg:max-w-4xl mt- mb-24 pb-4 sm:pb-6 md:pb-10 lg:pb-14 mx-auto bg-no-repeat bg-bottom bg-underline-title bg-contain ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white ">Tournament Request</h1>
      </div>
      <section>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-primary rounded-xl m-5 p-5 max-w-3xl mx-auto flex flex-wrap justify-center items-center"
        >
          <div className="w-full m-2">
            <label htmlFor="tname">Tournament's name</label>
            <input
              className="w-full bg-white p-1 rounded-md"
              type="text"
              id="tname"
              name="tname"
              placeholder="Name.."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tname}
            />
            {formik.touched.tname && formik.errors.tname ? (
              <div className="text-red-500">{formik.errors.tname}</div>
            ) : null}
          </div>
          <div className="w-full m-2">
            <label htmlFor="tdate">Tournament's date</label>
            <input
              className="w-full bg-white p-1 rounded-md"
              type="date"
              id="tdate"
              name="tdate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tdate}
            />
            {formik.touched.tdate && formik.errors.tdate ? (
              <div className="text-red">{formik.errors.tdate}</div>
            ) : null}
          </div>
          <div className="w-full m-2">
            <label htmlFor="nbPlayer">Number of players</label>
            <select
              id="nbPlayer"
              name="nbPlayer"
              className=" bg-white p-1 rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nbPlayer}
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
            {formik.touched.nbPlayer && formik.errors.nbPlayer ? (
              <div className="text-red">{formik.errors.nbPlayer}</div>
            ) : null}
          </div>
          <div className="w-full m-2">
            <label htmlFor="tdescription">Short description</label>
            <textarea
              className="w-full min-h-16 bg-white p-1 rounded-md"
              id="tdescription"
              name="tdescription"
              placeholder="Description.."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tdescription}
            />
            {formik.touched.tdescription && formik.errors.tdescription ? (
              <div className="text-red">{formik.errors.tdescription}</div>
            ) : null}
          </div>
          <div className="w-full m-2">
            <label htmlFor="timage">Tournament Image</label>
            <input
              className="w-full"
              type="file"
              id="timage"
              accept=".jpg, .jpeg, .png, .gif, .webp"
              name="timage"
              onChange={(event) => {
                formik.setFieldValue('timage', event.currentTarget.files[0]);
              }}
            />
            {formik.touched.timage && formik.errors.timage ? (
              <div className="text-red">{formik.errors.timage}</div>
            ) : null}
          </div>
          <input
            className="bg-primary hover:bg-secondary text-2xl text-white font-bold py-2 px-4 border-b-4 border border-secondary hover:border-tertiary rounded"
            type="submit"
            value="Submit"
            onClick={() => setShowModal(true)}
          />
          <Modal showModal={showModal} setShowModal={setShowModal} ></Modal>
        </form>
      </section>
    </div>
  );
}
