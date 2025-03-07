import { useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

import { AuthContext } from "../../context/AuthContext";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(AuthContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const handleProfileClick = () => {
    if (role === "doctor") {
      window.location.reload();
      window.location.replace("/doctor/profile/me");
    } else {
      window.location.reload();
      window.location.replace("/users/profile/me");
    }
  };
  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");
  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div className=" cursor-pointer">
            <Link to="/">
              <div></div>
              {/* <img src={logo} alt="logo"></img> */}
            </Link>
          </div>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((navLink) => (
                <li key={navLink.path}>
                  <NavLink
                    to={navLink.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500]"
                    }
                  >
                    {navLink.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ---logo--- */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <button onClick={handleProfileClick}>
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                    <img
                      src={user?.photo}
                      className=" w-full rounded-full"
                      alt="user-avatar"
                    />
                  </figure>
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className=" bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
