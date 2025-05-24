import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import HeaderLogo from "./HeaderLogo";
import HeaderNotifications from "./HeaderNotifications";
import HeaderMessages from "./HeaderMessages";
import DesktopNav from "./DesktopNav";
import HeaderSearchBar from "./HeaderSearchBar";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const isSearchPage = location.pathname === "/search";

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            <HeaderLogo />
            <DesktopNav />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {!isSearchPage && token && <HeaderSearchBar />}
            {token && (
              <>
                <HeaderMessages />
                <HeaderNotifications />
              </>
            )}
            <ProfileDropdown />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
