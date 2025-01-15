import { message, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import "./css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isNotDesktop = /mobile|android|iphone|ipad|tablet/i.test(userAgent);
    setIsDesktop(!isNotDesktop);
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        if (data.role === "Foj35J0Mky9L9QsxtTOsPlYl") {
          window.location.href = "/authpage";
          message.success("Giriş başarılı.");
        } else {
          navigate("/");
        }
      } else {
        message.error("Giriş başarısız.");
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleButtonClick = () => {
    window.location.href = "/";
  };
  return isLoading ? (
    <div style={{ display: "flex", justifyContent: "center", margin: "4rem" }}>
      <Spin
        spinning={true}
        indicator={<LoadingOutlined style={{ fontSize: 130, color: "var(--firstcolor)" }} spin />}
      ></Spin>
    </div>
  ) : (
    <div className="login-container">
      {isDesktop ? (
        <div className="login">
          <div className="adminPanel-name">
            <h2>Yönetici Paneli Giriş</h2>
          </div>
          <Link to={"/"}>
            <img src="../../../icons/alimname-krem-yazi.webp" className="alimname-yazı" />
          </Link>
          <form onSubmit={handleLogin}>
            <div className="login-inputs">
              <input type="text" placeholder="Yönetici adı" name="username" onChange={handleInputChange} />
              <input type="password" placeholder="Şifre" name="password" onChange={handleInputChange} />
            </div>
            <button>Giriş yap</button>
          </form>
        </div>
      ) : null}
      {isDesktop ? null : (<div className="Usepc-warn"><div className="Usepc">Yönetici paneline giriş yapmak için lütfen bilgisayar kullanın!</div><button className="Usepc-mainpage" onClick={handleButtonClick}>Anasayfa</button></div>)}
    </div>
  );
};

export default Login;
