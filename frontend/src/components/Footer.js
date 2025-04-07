// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";

import "../index.css"
export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white ">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/*Social link section */}
         <div>
            <h3 className="font-bold text-xl mb-4">Social Link</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaYoutube size={24} />
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-yellow-400">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-yellow-400">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-yellow-400">Contact</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-yellow-400">Login</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: support@healthtracker.com</li>
              <li className="text-gray-300">Phone: 20 567 890</li>
              <li className="text-gray-300">Address: 123 Health Street, sfax City</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Medicare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}