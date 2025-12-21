import AdminPage from "../pages/admin";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";

function App() { //මේකත් සම්පුර්ණ website එකම තියාගෙන ඉන්න තනි ටැග් එකක් 
                // ProductCard, onSaleNow tag වගේම 
  return (
      <>
      <div>
        <HomePage/>
        <AdminPage/>
        <LoginPage/>
      </div>
      </>
  );
}

export default App
