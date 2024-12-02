import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { useState, useContext, useEffect } from "react";
import UserContext from "../ContextApi/UserContext";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    handleToggle();
    navigate("/auth");
  };

  // Prevent background scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = toggle ? "hidden" : "auto";
  }, [toggle]);

  return (
    <header>
      {/* Desktop Navbar */}
      <nav className="lg:flex justify-between items-center text-black py-5 px-10 hidden shadow-lg">
        <Link to="/">
          <h1>Navbar</h1>
        </Link>
        <div className="navLinks">
          <ul className="flex justify-center items-center gap-10">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-base font-medium font-inter ${isActive ? "underline text-black px-3 py-1 rounded" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `text-base font-medium font-inter ${isActive ? "underline text-black px-3 py-1 rounded" : ""}`
                }
              >
                Create
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-base font-medium font-inter ${isActive ? "underline text-black px-3 py-1 rounded" : ""}`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-2 items-center">
            {user ? (
              <>
                <li>
                  <span className="text-sm font-medium">Welcome, {user.displayName}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-base font-medium font-inter underline text-black px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    `text-base font-medium font-inter ${isActive ? "underline text-black px-3 py-1 rounded" : ""}`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center text-black py-4 px-5">
          <Link to="/" className="w-20">
            <h1>Navbar</h1>
          </Link>
          <button
            className="text-4xl cursor-pointer"
            onClick={handleToggle}
            aria-expanded={toggle}
            aria-label="Toggle navigation menu"
          >
            <HiMenuAlt4 />
          </button>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`bg-sky-800 px-5 py-2 transition-all duration-300 absolute left-0 right-0 ${
            toggle ? "block" : "hidden"
          }`}
          role="menu"
        >
          <li className="py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white text-base font-normal ${isActive ? "underline px-3 py-1 rounded" : ""}`
              }
              onClick={handleToggle}
            >
              Home
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `text-white text-base font-normal ${isActive ? "underline px-3 py-1 rounded" : ""}`
              }
              onClick={handleToggle}
            >
              Create
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-white text-base font-normal ${isActive ? "underline px-3 py-1 rounded" : ""}`
              }
              onClick={handleToggle}
            >
              About
            </NavLink>
          </li>
          {user ? (
            <>
              <li className="py-2">
                <span className="text-white text-base font-normal">Welcome, {user.displayName}</span>
              </li>
              <li className="py-2">
                <button onClick={handleLogout} className="text-white text-base font-normal px-3 py-1 rounded underline">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="py-2">
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  `text-white text-base font-normal ${isActive ? "underline px-3 py-1 rounded" : ""}`
                }
                onClick={handleToggle}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
