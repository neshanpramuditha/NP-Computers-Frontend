import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import { Toaster } from "react-hot-toast";
import RegisterPage from "../pages/register";
import ForgotPassword from "../pages/forgetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() { 
                
  return (
      <GoogleOAuthProvider clientId="916749218322-p7nd9pkerv8hrtcmkjisue0cfbjutl35.apps.googleusercontent.com">
      <div className="w-full h-screen bg-primary text-secondary">
        <Toaster position="top-right"/>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="forgot-password" element={<ForgotPassword/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </div>
      </GoogleOAuthProvider>
  );
}
