import { Link } from "react-router-dom";
import { FaHandsHelping } from "react-icons/fa";

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <FaHandsHelping className="h-4 sm:h-8 w-4 sm:w-8 text-blue-600" />
      <span className="ml-2 text-md sm:text-xl font-bold text-gray-900">
        HandsOn
      </span>
    </Link>
  );
};

export default HeaderLogo;
