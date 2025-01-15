import React, { useEffect, useState } from 'react'
import Proptypes from "prop-types";
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.removeAttribute('data-theme');
    }if (!location.pathname.startsWith('/map')) { localStorage.removeItem('Region');}
  }, [location.pathname]);
    return (
      <div className="main-layout">
        {children}
      </div>
    );
  };

export default MainLayout;

MainLayout.propTypes = {
    children: Proptypes.node,
  };
