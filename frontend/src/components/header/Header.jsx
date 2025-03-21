import { useState, useEffect, useRef } from "react"; // Add useRef
import { useSelector, useDispatch } from "react-redux";
import { FaHandsHelping, FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Check if the current path is /search
  const isSearchPage = location.pathname === "/search";

  // Ref for the profile dropdown
  const profileDropdownRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false); // Close the dropdown
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when clicking any button inside it
  const handleDropdownClick = () => {
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Section - Logo and Main Nav */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <FaHandsHelping className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                HandsOn
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/events" className="text-gray-700 hover:text-blue-600">
                Events
              </Link>
              <Link
                to="/community"
                className="text-gray-700 hover:text-blue-600"
              >
                Community
              </Link>
              <Link to="/teams" className="text-gray-700 hover:text-blue-600">
                Teams
              </Link>
            </div>
          </div>

          {/* Right Section - Search and User Controls */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            {!isSearchPage && token && currentUser && (
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search events or causes..."
                  className="bg-transparent outline-none w-48"
                />
              </div>
            )}

            {/* Notification Bell */}
            {token && currentUser && (
              <button className="text-gray-600 hover:text-blue-600 relative">
                <FaBell className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
            )}

            {/* User Profile */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer
                "
              >
                {token && currentUser ? (
                  <div>
                    {currentUser.profileImage ? (
                      <img
                        src={currentUser.profileImage} // Use the profileImage URL
                        alt="Profile" // Add an alt text for accessibility
                        className="h-7 w-7 rounded-full" // Add styling (e.g., rounded-full for a circular image)
                      />
                    ) : (
                      <FaUserCircle className="h-7 w-7" /> // Fallback icon
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="ml-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Join the Community
                  </Link>
                )}
              </button>

              {/* Profile Dropdown */}
              {token && currentUser && isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <div
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleDropdownClick} // Close dropdown on click
                  >
                    <Link to="/dashboard">View Profile</Link>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout(); // Handle logout
                      handleDropdownClick(); // Close dropdown
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="pt-4 space-y-2">
              <Link
                to="/events"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Events
              </Link>
              <Link
                to="/community"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Community
              </Link>
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Dashboard
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center px-3 space-x-2">
                <FaSearch className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
