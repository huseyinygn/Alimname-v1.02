import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
const Header = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    localStorage.setItem('search-item', inputValue);
    window.location.href = "/search"
  };
  return (
    <header className={`mainheader`}>
      <Link to={"/"}>
    <img
      src="../../../../icons/alimname-logo.png"
      alt=""
      className={`maintop-logo`}
    />
    </Link>
    <div className={`mainheader-searchbar`}>
      <input
        className={`mainheader-textinput`}
        type="text"
        placeholder="Alim arayın..."
        value={inputValue}
          onChange={handleInputChange}
      />
      <button className="mainheader-ara"  onClick={handleButtonClick}>Ara</button>
    </div>
    <nav className={`mainheader-nav`}>
      <Link to={"/hakkimizda"}>
      <button className="mainheader-hakkimizda">Hakkımızda</button>
      </Link>
    </nav>
  </header>
  )
}

export default Header
