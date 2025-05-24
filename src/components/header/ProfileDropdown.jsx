import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
  FaUserFriends,
  FaCog,
  FaBell,
  FaCommentDots,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

// Menu configuration with corresponding icons
const dropDownMenus = [
  {
    id: 1,
    name: "View Profile",
    url: "/dashboard",
    icon: <FaUser className="mr-3 text-gray-400 flex-shrink-0" />,
  },
  {
    id: 2,
    name: "My Events",
    url: "/events",
    icon: <FaCalendarAlt className="mr-3 text-gray-400 flex-shrink-0" />,
  },
  {
    id: 3,
    name: "Community",
    url: "/community",
    icon: <FaUsers className="mr-3 text-gray-400 flex-shrink-0" />,
  },
  {
    id: 4,
    name: "Teams",
    url: "/teams",
    icon: <FaUserFriends className="mr-3 text-gray-400 flex-shrink-0" />,
  },
  {
    id: 5,
    name: "Notifications",
    url: "/notifications",
    icon: <FaBell className="mr-3 text-gray-400 flex-shrink-0" />,
  },
  {
    id: 6,
    name: "Chats",
    url: "/chats",
    icon: <FaCommentDots className="mr-3 text-gray-400 flex-shrink-0" />,
  },
  {
    id: 7,
    name: "Settings",
    url: "/settings",
    icon: <FaCog className="mr-3 text-gray-400 flex-shrink-0" />,
  },
];

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!token) {
    return (
      <Link
        to="/login"
        className="ml-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
      >
        <FaUserCircle className="mr-2" />
        Join the Community
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 cursor-pointer group relative"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="relative">
          {currentUser?.profileImage ? (
            <img
              src={currentUser.profileImage}
              alt="Profile"
              className="h-5 sm:h-9 w-5 sm:w-9 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="h-9 w-9 text-gray-500 group-hover:text-blue-500 transition-colors" />
          )}
        </div>
        {/* Chevron indicator */}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100 divide-y divide-gray-100">
          {/* User info section */}
          <div className="px-4 py-2">
            <p className="text-sm font-medium text-gray-900 truncate">
              {currentUser?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {currentUser?.email || ""}
            </p>
          </div>

          {/* Navigation links */}
          <div className="py-1">
            {dropDownMenus.map((menu) => (
              <Link
                key={menu.id}
                to={menu.url}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {menu.icon}
                <span>{menu.name}</span>
              </Link>
            ))}
          </div>

          {/* Logout button */}
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <FaSignOutAlt className="mr-3 text-gray-400 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
