import { FaSearch } from "react-icons/fa";

const HeaderSearchBar = () => {
  return (
    <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search events or causes..."
        className="bg-transparent outline-none w-48"
      />
    </div>
  );
};

export default HeaderSearchBar;
