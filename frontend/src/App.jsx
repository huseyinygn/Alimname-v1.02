import { Route, Routes } from "react-router-dom";
import React, { Suspense} from "react";
import Mainpage from "./pages/Mainpage";
import AdminListPage from "./pages/admin/AdminListPage.jsx";
import CreateAlimPage from "./pages/admin/alims/CreateAlimPage.jsx";
import AlimListAdpage from "./pages/admin/alims/AlimListAdpage.jsx.jsx";
import UpdateAlimPage from "./pages/admin/alims/UpdateAlimPage.jsx";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
/* import Adminlogin from "./pages/Adminlogin.jsx";
import AlimDetailsPage from "./pages/AlimDetailsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import HakkimizdaPage from "./pages/HakkimizdaPage.jsx";
import Map from "./components/Map/Map.jsx"; */

function App() {
  const LazyAdminLogin = React.lazy(()=>import("./pages/Adminlogin.jsx"))
  const LazyAlimDetailsPage = React.lazy(()=>import("./pages/AlimDetailsPage.jsx"))
  const LazyHakkimizdaPage = React.lazy(()=>import("./pages/HakkimizdaPage.jsx"))
  const LazySearchPage = React.lazy(()=>import("./pages/SearchPage.jsx"))
  const LazyMap = React.lazy(()=>import("./components/Map/Map.jsx"))
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/prijava" element={
        <Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}>
          <LazyAdminLogin/></Suspense>} />
      <Route path="/alim/:id" element={<Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}><LazyAlimDetailsPage/></Suspense>} />
      <Route path="/hakkimizda" element={<Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}><LazyHakkimizdaPage/></Suspense>} />
      <Route path="/search" element={<Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}><LazySearchPage/></Suspense>} />
      <Route path="/map" element={<Suspense fallback={<div style={{display:"flex", justifyContent:"center", margin:"4rem"}}><Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin></div>}><LazyMap/></Suspense>} />
      <Route path="/zupizu/*">
        <Route index element={<AlimListAdpage />} />
        <Route path="admins" element={<AdminListPage />} />
        <Route path="alim/add" element={<CreateAlimPage />} />
        <Route path="alim/update/:id" element={<UpdateAlimPage />} />
      </Route>
    </Routes>
  );
}

export default App;
