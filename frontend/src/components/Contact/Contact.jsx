import { useRef } from 'react';
import ContactForm from './ContactForm';

export default function Contact() {
  const formRef = useRef();

  const handleSubmit = (values) => {
    console.log(values);
    formRef.current.resetForm(); 
  };

  const handleDiscard = () => {
    formRef.current.resetForm();
  };

  return (
<div className="flex flex-col items-center justify-center p-4">
<div className="mx-auto max-w-2xl text-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Contact Us</h2>
      </div>
      <div className="relative flex flex-col text-black bg-secondary shadow-md bg-clip-border w-full max-w-md p-4 sm:max-w-lg md:max-w-xl">
        <ContactForm ref={formRef} onSubmit={handleSubmit} />
      </div>
      <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
      <button
  type="button"
  onClick={() => formRef.current.submitForm()}
  className="before:ease relative h-12 w-full sm:w-40 overflow-hidden border border-black bg-primary text-black shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-primary hover:before:-translate-x-40 px-4 py-2"
>
  Send message
</button>
<button
  type="button"
  onClick={handleDiscard}
  className="before:ease relative h-12 w-full sm:w-40 overflow-hidden border border-black bg-opacity-0 text-black shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-primary hover:before:-translate-x-40 px-4 py-2"
>
  Discard
</button>
      </div>
    </div>
  );
}

