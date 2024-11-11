import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Adminlogin from "./pages/Adminlogin.jsx";
import AdminListPage from "./pages/admin/AdminListPage.jsx";
import CreateAlimPage from "./pages/admin/alims/CreateAlimPage.jsx";
import AlimListAdpage from "./pages/admin/alims/AlimListAdpage.jsx.jsx";
import UpdateAlimPage from "./pages/admin/alims/UpdateAlimPage.jsx";
import AlimDetailsPage from "./pages/AlimDetailsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import HakkimizdaPage from "./pages/HakkimizdaPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/prijava" element={<Adminlogin />} />
      <Route path="/alim/:id" element={<AlimDetailsPage />} />
      <Route path="/hakkimizda" element={<HakkimizdaPage />} />
      <Route path="/search" element={<SearchPage />} />
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
