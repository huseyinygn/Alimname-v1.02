import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ConfigProvider, Switch } from "antd";
const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    localStorage.setItem("search-item", inputValue);
    window.location.href = "/search";
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
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
          onKeyDown={handleKeyDown}
        />
        <button className="mainheader-ara" onClick={handleButtonClick}>
          Ara
        </button>
      </div>
      <nav className={`mainheader-nav`}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ddba7ae6",
            },
            components: {
              Switch: {
                handleBg: "var(--highcolor)",
              },
            },
          }}
        >
          <Switch
            className={`ThemeSwitchHeader`}
            checked={isDarkMode}
            onChange={toggleTheme}
          />
        </ConfigProvider>
        <Link to={"/hakkimizda"}>
          <button className="mainheader-hakkimizda">Hakkımızda</button>
        </Link>
        <Link to={"/map"}>
        <button className="mainheader-map" ><i class="bi bi-globe-central-south-asia"></i></button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
