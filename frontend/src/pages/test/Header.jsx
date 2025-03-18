import React, { useState } from "react";
import FilterSidebar from "./FilterSidebar";

const Header = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <header className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full p-2 rounded-md"
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
        >
          Filters
        </button>
        <button className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300">
          Create Event
        </button>
      </div>
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </header>
  );
};

export default Header;
