import React, { useEffect, useState } from 'react'
import "./Map.css"
const Map = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme'); 
    if (savedTheme === 'dark') { 
      setIsDarkMode(true); 
      document.documentElement.setAttribute('data-theme', 'dark'); } 
      else 
      { setIsDarkMode(false); document.documentElement.removeAttribute('data-theme'); }
  }, []);
  return (
    <div>
      sasa
    </div>
  )
}

export default Map
