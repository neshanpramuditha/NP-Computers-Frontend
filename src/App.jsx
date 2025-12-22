import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";

function App() { //මේකත් සම්පුර්ණ website එකම තියාගෙන ඉන්න තනි ටැග් එකක් 
                // ProductCard, onSaleNow tag වගේම 
  return (
      <>
      <div className="w-full h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminPage />} /> {/* admin කියල එන ඕන  දෙයක් ගන්නව /* එක දැම්මම (ex- /admin/products)*/}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      </>
  );
}

export default App
