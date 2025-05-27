import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";

function NavBar() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ResumeCraft AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"
            >
              About
            </Link>
            <Link 
              to="/generate-resume" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"
            >
              Generator
            </Link>
            <Link 
              to="/templates" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"
            >
              Templates
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"
            >
              Contact
            </Link>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-indigo-600" />
              )}
            </button>

            <Link 
              to="/generate-resume" 
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white shadow-md"
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-indigo-600" />
              )}
            </button>
            
            <button className="text-gray-700 focus:outline-none">
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;