import styles from "./app.module.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "../../pages/Home/home";
import SideBar from "../SideBar/sideBar";
import NavBar from "../NavBar/navBar";
import Domains from "../../pages/Domains/domains";
import Dashboard from "../../pages/Dashboard/Dashboard";
import DataLeads from "../../pages/DataLeads/DataLeads";
import PreMoney from "../../pages/PreMoney/PreMoney";


function App() {
  return (
    <div className={styles.container}>
    
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/data-leads" element={<DataLeads />} />
          <Route path="/pre-money" element={<PreMoney />} />
        </Routes>
      </SideBar>
    </div>
  );
}

export default App;
