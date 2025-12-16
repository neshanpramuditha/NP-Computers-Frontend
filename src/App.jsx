import OnSaleNow from "./components/onSaleNow.jsx"
import UserData from "./components/userData.jsx"

function App() { //මේකත් සම්පුර්ණ website එකම තියාගෙන ඉන්න තනි ටැග් එකක් 
                // ProductCard, onSaleNow tag වගේම 
  return (
      <>
        <div className="bg-blue-400 border-4 border-black">
          <h1>Welcome to my first React Web</h1>
          <OnSaleNow />
          <UserData/>
        </div>
      </>
  )
}

export default App
