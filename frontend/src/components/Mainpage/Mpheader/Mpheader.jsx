import { Link } from "react-router-dom";
import "./Mpheader.css";
import { useState, useEffect } from "react";

const MpHeader = () => {
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    const windowScrollTop = window.scrollY;
    setSticky(windowScrollTop > 230);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <Link to={"/hakkimizda"}>
      <nav className={`header-nav ${isSticky ? "sticky" : ""}`}>
        <button className="header-hakkimizda">Hakkımızda</button>
      </nav>
      </Link>
    </header>
  );
};

export default MpHeader;
