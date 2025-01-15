import { Link } from "react-router-dom";
import "./Mpheader.css";
import { useState, useEffect } from "react";
import { ConfigProvider, Switch } from 'antd';

const MpHeader = () => {
  const [isSticky, setSticky] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleScroll = () => {
    const windowScrollTop = window.scrollY;
    setSticky(windowScrollTop > 230);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const savedTheme = localStorage.getItem('theme'); 
    if (savedTheme === 'dark') { 
      setIsDarkMode(true); 
      document.documentElement.setAttribute('data-theme', 'dark'); } 
      else 
      { setIsDarkMode(false); document.documentElement.removeAttribute('data-theme'); }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => { 
    setIsDarkMode(!isDarkMode); 
    if (!isDarkMode) { 
      document.documentElement.setAttribute('data-theme', 'dark'); 
      localStorage.setItem('theme', 'dark'); } 
      else { 
        document.documentElement.removeAttribute('data-theme'); localStorage.setItem('theme', 'light');
       } };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    localStorage.setItem('search-item', inputValue);
    window.location.href = "/search"
  };

  const handleKeyDown = (event) => { if (event.key === 'Enter') { handleButtonClick(); } };



   
  return (
    <header className={`header ${isSticky ? "sticky" : ""}`}>
      <Link to={"/"}>
      <img
        src="././icons/alimname-logo.png"
        alt=""
        className={`top-logo ${isSticky ? "sticky" : ""}`}
      />
      </Link>
      <div className={`header-searchbar ${isSticky ? "sticky" : ""}`}>
        <input
          className={`header-textinput ${isSticky ? "sticky" : ""}`}
          type="text"
          placeholder="Alim arayın..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="header-ara" onClick={handleButtonClick}>Ara</button>
      </div>
      
      <nav className={`header-nav`}>
      <ConfigProvider theme={{
        token: {
          colorPrimary:"#ddba7ae6",
        },
    components: {
      Switch: {
        handleBg:"var(--highcolor)",
      }
    },
  }}> 
        <Switch className={`ThemeSwitch ${isSticky ? "sticky" : ""}`} checked={isDarkMode} onChange={toggleTheme}/>
        </ConfigProvider>
        <Link to={"/hakkimizda"}>
        <button className={`header-hakkimizda ${isSticky ? "sticky" : ""}`}>Hakkımızda</button>
        </Link>
        <Link to={"/map"}>
        <button className={`header-map ${isSticky ? "sticky" : ""}`}><i className="bi bi-globe-central-south-asia"></i></button>
        </Link>
      </nav>
      
    </header>
  );
};

export default MpHeader;
