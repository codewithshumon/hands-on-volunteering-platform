import { FaBell } from "react-icons/fa";

const HeaderNotifications = () => {
  return (
    <button className="text-gray-600 hover:text-blue-600 relative hover:cursor-pointer">
      <FaBell className="h-5 w-5" />
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        3
      </span>
    </button>
  );
};

export default HeaderNotifications;
