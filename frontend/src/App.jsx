import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import FooterCom from "./components/FooterCom";

function App() {
  return (
    <>
    <div className="bg-bgPrimary min-h-screen flex flex-col">
      <Navbar/>
      <div className="flex-glow">
        <Outlet/>
      </div>
      <FooterCom/>
    </div>
      
    </>
  );
}

export default App;
