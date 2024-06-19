import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-custom-svg bg-cover bg-center py-10 text-gray-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-center space-x-8 text-center md:text-left">
          <div className="px-2 md:px-4 flex-1 border bg-black">
            <div className="max-w-64 mx-auto border">
              <h2 className="text-xl text-white font-bold mb-4">Column 1</h2>
              <ul className="space-y-2">
                <li><a href="#" className=" text-white hover:text-vertBG">Link 1</a></li>
                <li><a href="#" className=" text-white hover:text-vertBG">Link 2</a></li>
                <li><a href="#" className=" text-white hover:text-vertBG">Link 3</a></li>
              </ul>
            </div>
          </div>
          <div className="px-2 md:px-4 flex-1 border">
            <div className="max-w-64 mx-auto border">
              <h2 className="text-xl font-bold mb-4 text-white">Arena Maven</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-white hover:text-vertBG">Link 1</a></li>
                <li><a href="#" className="text-white hover:text-vertBG">Link 2</a></li> 
              </ul>
            </div>
          </div>
          <div className="px-2 md:px-4 flex-1 border">
            <div className="max-w-64 mx-auto border">
              <h2 className="text-xl font-bold mb-4 text-white">Column 3</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-white hover:text-vertBG">Link 1</a></li>
                <li><a href="#" className="text-white hover:text-vertBG">Link 2</a></li>
                <li><a href="#" className="text-white hover:text-vertBG">Link 3</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
