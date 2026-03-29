import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import { Toaster } from "react-hot-toast";
import RegisterPage from "../pages/register";
import ForgotPassword from "../pages/forgetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() { //මේකත් සම්පුර්ණ website එකම තියාගෙන ඉන්න තනි ටැග් එකක් 
                // ProductCard, onSaleNow tag වගේම 
  return (
      <GoogleOAuthProvider clientId="916749218322-p7nd9pkerv8hrtcmkjisue0cfbjutl35.apps.googleusercontent.com">
      <div className="w-full h-screen bg-primary text-secondary">
        <Toaster position="top-right"/>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminPage />} /> {/* admin කියල එන ඕන  දෙයක් ගන්නව /* එක දැම්මම (ex- /admin/products)*/}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="forgot-password" element={<ForgotPassword/>}/>
        </Routes>
      </div>
      </GoogleOAuthProvider>
  );
}
