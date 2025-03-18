const FilterSidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="w-64 bg-white h-full p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select className="w-full p-2 border rounded-md">
            <option>Environment</option>
            <option>Education</option>
            <option>Health</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <input type="date" className="w-full p-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Only Show Events with Open Spots</span>
          </label>
        </div>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
