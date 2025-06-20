import { Link, NavLink } from "react-router-dom";
import { motion } from 'framer-motion';
import { FiUser, FiLogOut, FiHome, FiMail } from "react-icons/fi";
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
    const { currentUser, logout } = useAuth();

  const handleSignOut = () => {
    logout()
      .then(() => console.log("User logged out"))
      .catch((error) => console.error("Logout failed", error));
  };

  const navLinks = [
    { path: "/", name: "Home", icon: <FiHome className="mr-2 text-red-500" /> },
    { path: "/contact", name: "Contact", icon: <FiMail className="mr-2 text-red-500" /> },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-cyan-950 shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <img className="w-14 h-14" src={logo} alt="logo" /> */}
            <span className="text-2xl font-bold text-orange-600">Eventrum</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-white text-orange-600' 
                      : 'text-orange-600 hover:bg-gray-50'
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Account Dropdown */}
            {currentUser ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  {currentUser.photoURL ? (
                    <img
                      className="w-10 h-10 rounded-full border-2 border-orange-500"
                      src={currentUser.photoURL}
                      alt="User Avatar"
                    />
                  ) : (
                    <div className="p-2 rounded-full bg-gray-100">
                      <FiUser className="w-6 h-6" />
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl shadow-lg bg-white transform scale-0 group-hover:scale-100 transition-transform">
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      {currentUser.photoURL ? (
                        <img
                          className="w-12 h-12 rounded-full"
                          src={currentUser.photoURL}
                          alt="User Avatar"
                        />
                      ) : (
                        <div className="p-2 rounded-full bg-orange-100">
                          <FiUser className="w-8 h-8 text-red-600" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {currentUser.displayName || 'User'}
                        </p>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 text-sm rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-lg  text-white hover:bg-orange-700 transition-colors"
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 rounded-lg border border-orange-600 text-orange-600 font-bold hover:bg-orange-100 transition-colors"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-lg ${
                    isActive 
                      ? 'bg-blue-100 text-red-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;