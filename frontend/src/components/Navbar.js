// frontend/src/components/Navbar.js
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, isAuthenticated, logout } from '../services/auth';
import logo from '../assets/healthLogo.jpg';
import getImageSrc from '../assets/ImageProfile';
import "../index.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUser();
        console.log("current user has path image ", currentUser?.profilePicture);
        setIsLoggedIn(isAuthenticated());
        setUser(currentUser);
      } catch (error) {
        console.log('Error in fetching user:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Check auth on initial render
    checkAuth();

    // Listen for token changes
    window.addEventListener('storage', checkAuth);

    // Clean up event listeners
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  

  if (loading) {
    return (
      <nav className="bg-blue-900 text-white shadow-md p-4 w-full fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-2">
          <div className="flex items-center space-x-3">
            <img
              className="h-11 w-11"
              src={logo}
              alt="Health Logo"
              onClick={() => navigate('/')}
            />
            <h1 className="text-2xl font-bold text-teal-100 animate-scroll">Take Care Of Your Health</h1>
          </div>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="bg-blue-900 text-white shadow-md p-4 w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-2">
        <div className="flex items-center space-x-3 cursor-pointer"
          onClick={()=>navigate("/")}>
          <img
            className="h-11 w-11"
            src={logo}
            alt="Health Logo"
    
          />
          <h1 className="text-2xl font-bold text-teal-100 animate-scroll">Take Care Of Your Health</h1>
        </div>

        <div className="hidden md:flex space-x-6">
         
          {!isLoggedIn && (
            <>
             <Link to="/" className="text-gray-300 font-bold hover:text-yellow-400">Home</Link>
              <Link to="/about" className="text-gray-300 font-bold hover:text-yellow-400">About</Link>
              <Link to="/contact" className="text-gray-300 font-bold hover:text-yellow-400">Contact</Link>
            </>
          )}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={getImageSrc(user?.profilePicture)}
                  alt={user?.firstName || 'Profile'}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  
                  onClick={() => 
                      user.role==='doctor' ?  navigate('/doctor-dashboard') : navigate('/patient-dashboard')}
                  onError={(e) => {
                    e.currentTarget.src =getImageSrc(user?.profilePicture);
                  }}
                />
              </div>
              <span className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400">
                <span className='font-bold'>{user?.email}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-300 font-bold hover:text-yellow-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-gray-300 font-bold hover:text-yellow-400">Login</Link>
          )}
        </div>

        <button className="md:hidden p-2 bg-blue-700 rounded" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X color="white" /> : <Menu color="white" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 p-4 bg-blue-800 shadow-md w-full">
          
          {!isLoggedIn && (
            <>
             
              <Link to="/about" className="text-gray-300 hover:text-yellow-400">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-yellow-400">Contact</Link>
            </>
          )}
          {isLoggedIn ? (
            <div className="flex flex-col space-y-2">
              <div className="relative">
                <img
                  src={getImageSrc(user?.profilePicture)}
                  alt={user?.firstName || 'Profile'}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => navigate('/profile')}
                  onError={(e) => {
                    e.currentTarget.src = getImageSrc(user?.profilePicture);
                  }}
                />
              </div>
              <span className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400">
                <span>{user?.email}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-yellow-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-yellow-400">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}