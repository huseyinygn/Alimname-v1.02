import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import {
    UserOutlined,
    PlusCircleOutlined, 
    HomeOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const menuItems = [
    {
        key: "4",
        icon: <HomeOutlined />,
        label: "Anasayfa",
        onClick: () => {
          window.location.href = "/"
        },
      },
    {
      key: "1",
      icon: <UnorderedListOutlined />,
      label: "Alim Listesi",
      path:"/zupizu",
      onClick: () => {
        navigate(`/zupizu`);
      },
    },
    {
      key: "2",
      icon: <PlusCircleOutlined />,
      label: "Alim Ekleme",
      path: "/zupizu/alim/add",
      onClick: () => {
        navigate(`/zupizu/alim/add`);
      },
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Admin Listesi",
      path: "/zupizu/admins",
      onClick: () => {
        navigate(`/zupizu/admins`);
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

if (userRole === "Foj35J0Mky9L9QsxtTOsPlYl") {
  return (
    <div className="admin-layout">
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider width={200} theme="dark">
          <Menu
            mode="vertical"
            style={{
              height: "100%",
              display:"flex",
               flexDirection:"column",
               justifyContent:"center",
               gap:"1rem",
               borderColor:"var(--firstcolor)",
            }}
            items={menuItems}
            defaultSelectedKeys={[getActiveKey()]}
          />
        </Sider>
        <Layout>
          <Header
          style={{
            backgroundColor:"var(--firstcolor)"
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
  return (window.location.href = "/");
}
  
};
export default AdminLayout;
AdminLayout.propTypes = {
    children: PropTypes.node,
  };