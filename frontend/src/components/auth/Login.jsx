import { message, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import "./css/Login.css";
const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });
      const [isLoading, setIsLoading] = useState(false)
      const navigate = useNavigate();
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleLogin = async (e) => {
        setIsLoading(true)
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
              window.location.href = "/zupizu";
              message.success("Giriş başarılı.");
            } else {
              navigate("/");
            }
          } else {
            message.error("Giriş başarısız.");
          }
        } catch (error) {
          console.log("Giriş hatası:", error);
        }finally{
          setIsLoading(false);
        }
      };
    

    return isLoading?(
      <div style={{display:"flex", justifyContent:"center", margin:"4rem"}}>
      <Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin>
          </div>
    ):(
      <div className="login-container">
            <div className="login">
            <div className="adminPanel-name">
             <h2>Yönetici Paneli Giriş</h2>
            </div>
            <img src="../../../icons/alimname-krem-yazi.png" className="alimname-yazı"/>
            <form onSubmit={handleLogin}>
            <div className="login-inputs">
                <input type="text" placeholder="Kullanıcı ismi" name="username" onChange={handleInputChange}/>
                <input type="password" placeholder="Şifre" name="password" onChange={handleInputChange}/>
            </div>
            <button>Giriş yap</button>
            </form>
            </div>
        </div>
    )
}

export default Login;