import { forwardRef, useImperativeHandle } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ContactForm = forwardRef((props, ref) => {
  const { onSubmit } = props;

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    message: Yup.string().required('Required'),
  });

  useImperativeHandle(ref, () => ({
    resetForm: () => formik.resetForm(),
    submitForm: () => formik.submitForm(),
  }));

  return (
    <div className="isolate bg-secondary px-4 py-10 sm:py-10 lg:px-8"> 
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          
          useImperativeHandle(ref, () => ({
            resetForm: formik.resetForm,
            submitForm: formik.submitForm,
          }));
          return (
            <Form className="mx-auto mt-8 max-w-lg sm:mt-8"> 
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-black">
                    What should we call you?
                  </label>
                  <div className="mt-2.5">
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your name"
                      autoComplete="name"
                      className="block w-full border-0 px-3.5 py-2 bg-black text-white shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="name" component="div" className="text-orange-500  text-sm mt-1" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-black">
                    Mail
                  </label>
                  <div className="mt-2.5">
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="your.name@acme.com"
                      autoComplete="email"
                      className="block w-full border-0 px-3.5 py-2 bg-black text-white shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="email" component="div" className="text-orange-500  text-sm mt-1" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-black">
                    Message
                  </label>
                  <div className="mt-2.5">
                    <Field
                      as="textarea"
                      name="message"
                      id="message"
                      placeholder="Hi, I am writing you about ..."
                      rows={4}
                      className="block w-full border-0 px-3.5 py-2 bg-black text-white shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="message" component="div" className="text-orange-500 text-sm mt-1" />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});

export default ContactForm;

