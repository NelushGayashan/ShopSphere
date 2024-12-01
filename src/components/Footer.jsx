// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-cyan-400 shadow-md fixed bottom-0 left-0 right-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-6">
        <p className="text-sm text-white opacity-80 hover:opacity-100 transition-opacity duration-300">
          &copy; {new Date().getFullYear()} <span className="font-semibold">ShopSphere</span>. All rights reserved.
        </p>
        <p className="text-sm text-white opacity-80 hover:opacity-100 transition-opacity duration-300 mt-2">
          Developed by{' '}
          <a
            href="https://github.com/NelushGayashan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-400 font-semibold transition-colors duration-300"
          >
            Nelush Gayashan Fernando
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
