import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link to="/events" className="text-gray-700 hover:text-blue-600">
        Events
      </Link>
      <Link to="/community" className="text-gray-700 hover:text-blue-600">
        Community
      </Link>
      <Link to="/teams" className="text-gray-700 hover:text-blue-600">
        Teams
      </Link>
    </div>
  );
};

export default DesktopNav;
