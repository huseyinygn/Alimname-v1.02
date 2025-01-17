import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  PlusCircleOutlined,
  HomeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const { Sider, Header, Content } = Layout;
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};

const AdminLayout = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("user");
    };

    const handleThemeChange = () => {
      setTheme(getTheme());
    };

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isNotDesktop = /mobile|android|iphone|ipad|tablet/i.test(userAgent);
     setIsDesktop(!isNotDesktop); 

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("storage", handleThemeChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("storage", handleThemeChange);
    };
  }, []);

  const navigate = useNavigate();
  const userRole = getUserRole();
  const menuItems = [
    {
      key: "4",
      icon: <HomeOutlined />,
      label: "Anasayfa",
      onClick: () => {
        window.location.href = "/";
      },
    },
    {
      key: "1",
      icon: <UnorderedListOutlined />,
      label: "Alim Listesi",
      path: "/authpage",
      onClick: () => {
        navigate(`/authpage`);
      },
    },
    {
      key: "2",
      icon: <PlusCircleOutlined />,
      label: "Alim Ekleme",
      path: "/authpage/alim/add",
      onClick: () => {
        navigate(`/authpage/alim/add`);
      },
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Admin Listesi",
      path: "/authpage/admins",
      onClick: () => {
        navigate(`/authpage/admins`);
      },
    },
  ];

  const getActiveKey = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.key;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.key;
        }
      }
    }
  };

  const getPageTitle = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.label;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.label;
        }
      }
    }
  };

  if (/* userRole === "Foj35J0Mky9L9QsxtTOsPlYl" && */ isDesktop) {
    return (
      <div className="admin-layout">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider width={200}>
            <Menu
              mode="vertical"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1rem",
                borderColor: "var(--firstcolor)",
                backgroundColor: "var(--secondcolor)",
              }}
              items={menuItems}
              defaultSelectedKeys={[getActiveKey()]}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                backgroundColor: "var(--firstcolor)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <h2>{getPageTitle()}</h2>
              </div>
            </Header>
            <Content>
              <div
                className="site-layout-background"
                style={{
                  padding: "24px 50px",
                  minHeight: 360,
                  backgroundColor: "var(--secondcolor)",
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {" "}
        <div
          style={{
            fontWeight: 500,
            color: "var(--linkhovercolor)",
            backgroundColor: "var(--pageBackgroundColor)",
            padding: "1rem",
            borderRadius: "1rem",
          }}
        >
          {" "}
          Yönetici paneline giriş yapmak için lütfen bilgisayar kullanın!{" "}
        </div>{" "}
        <button
          style={{
            height: "3rem",
            backgroundColor: "var(--highcolor)",
            border: "0.1rem solid var(--highcolor)",
            borderRadius: "0.5rem",
            fontSize: "1.4rem",
            fontWeight: 400,
            color: "var(--textgray)",
          }}
          onClick={() => (window.location.href = "/")}
        >
          {" "}
          Anasayfa{" "}
        </button>{" "}
      </div>
    );
  }
};

export default AdminLayout;
AdminLayout.propTypes = {
  children: PropTypes.node,
};
