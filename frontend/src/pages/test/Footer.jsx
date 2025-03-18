import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 VolunteerHub. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="mx-2 hover:text-gray-400">
            Contact
          </a>
          <a href="#" className="mx-2 hover:text-gray-400">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
