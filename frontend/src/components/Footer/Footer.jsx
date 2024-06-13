// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-custom-svg bg-cover bg-center py-10 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div>
            <h2 className="text-xl font-bold mb-4">Column 1</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-100">Link 1</a></li>
              <li><a href="#" className="hover:text-gray-100">Link 2</a></li>
              <li><a href="#" className="hover:text-gray-100">Link 3</a></li>
              <li><a href="#" className="hover:text-gray-100">Link 4</a></li>
              <li><a href="#" className="hover:text-gray-100">Link 5</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Column 2</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-100">Link 1</a></li>
              <li><a href="#" className="hover:text-gray-100">Link 2</a></li> 
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Column 3</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-100">Link 1</a></li>
              <li><a href="#" className="hover:text-gray-100">Link 2</a></li>
              <li><a href="#" className="hover:text-gray-100">Link 3</a></li>
              <li><a href="#" className="hover:text-gray-100">Link 4</a></li>
              <li><a href="#" className="hover:text-gray-100">Link 5</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
