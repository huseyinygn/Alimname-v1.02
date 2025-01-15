import { Route, Routes } from "react-router-dom";
import React, { Suspense} from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Mainpage from "./pages/Mainpage";
/* import AdminListPage from "./pages/admin/AdminListPage.jsx";
import CreateAlimPage from "./pages/admin/alims/CreateAlimPage.jsx";
import AlimListAdpage from "./pages/admin/alims/AlimListAdpage.jsx.jsx";
import UpdateAlimPage from "./pages/admin/alims/UpdateAlimPage.jsx";
import Adminlogin from "./pages/Adminlogin.jsx";
import AlimDetailsPage from "./pages/AlimDetailsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Map from "./components/Map/Map.jsx";  */

function App() {
  const LazyAdminLogin = React.lazy(()=>import("./pages/Adminlogin.jsx"))
  const LazyAlimDetailsPage = React.lazy(()=>import("./pages/AlimDetailsPage.jsx"))
  const LazySearchPage = React.lazy(()=>import("./pages/SearchPage.jsx"))
  const LazyMapPage = React.lazy(()=>import("./pages/MapPage.jsx"))
  const LazyAlimListAdpage = React.lazy(()=>import("./pages/admin/alims/AlimListAdpage.jsx.jsx"))
  const LazyAdminListPage = React.lazy(()=>import("./pages/admin/AdminListPage.jsx"))
  const LazyCreateAlimPage = React.lazy(()=>import("./pages/admin/alims/CreateAlimPage.jsx"))
  const LazyUpdateAlimPage = React.lazy(()=>import("./pages/admin/alims/UpdateAlimPage.jsx"))
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/authlogin" element={
        <Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}>
          <LazyAdminLogin/></Suspense>} />
      <Route path="/alim/:id" element={<Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}><LazyAlimDetailsPage/></Suspense>} />
      <Route path="/search" element={<Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}><LazySearchPage/></Suspense>} />
      <Route path="/map" element={<Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}><LazyMapPage/></Suspense>} />
      <Route path="/authpage/*">
        <Route index element={<Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}><LazyAlimListAdpage/></Suspense>} />
        <Route path="admins" element={<Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}><LazyAdminListPage/></Suspense>} />
        <Route path="alim/add" element={<Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}><LazyCreateAlimPage/></Suspense>} />
        <Route path="alim/update/:id" element={<Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}><LazyUpdateAlimPage/></Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
