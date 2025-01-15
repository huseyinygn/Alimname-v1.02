import React, { useEffect, useState } from 'react'
import "./Hakkimizda.css"
const Hakkimizda = () => {
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
    <div className='Hakkimizda-container'>
        <div className='Hakkimizda-centerflex'>sa</div>
    </div>
  )
}

export default Hakkimizda
