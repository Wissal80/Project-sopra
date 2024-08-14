import { useState, useEffect } from "react";
import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Accueil from "./scenes/Accueil";
import Candidat from "./scenes/Candidat";
import CandidatP from "./scenes/CandidatP";
import Profile from "./scenes/Profile";
import Login from "./scenes/login/index";
import ProfileP from "./scenes/ProfileP";
import DashboardGlobal from "./scenes/DashboardGlobal";
import Absence from "./scenes/Absence";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Candidatures from "./scenes/Candidatures";
import Postes from "./scenes/Postes";
import Signup from "./scenes/Signup";
import Recrutement from "./scenes/Recrutement";
import EntréesSorties from "./scenes/EntréesSorties";
import Candidats from "./scenes/Candidats";
import Demandes from "./scenes/Demandes";
import Employes from "./scenes/Rapports/Employes";
import CandidatsR from "./scenes/Rapports/CandidatsR";
import PostesR from "./scenes/Rapports/PostesR";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarLogin, setIsSidebarLogin] = useState(true);
  const [isTopbarLogin, setIsTopbarLogin] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const location = useLocation();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);
  
  useEffect(() => {
    setIsSidebarLogin(location.pathname !== '/login' && location.pathname !== '/signup');
    setIsTopbarLogin(location.pathname !== '/login' && location.pathname !== '/signup');
  }, [location.pathname]);
 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isSidebarLogin && <Sidebar userRole={userRole} />}
          <main className="content">
            {isTopbarLogin && <Topbar setIsSidebarLogin={setIsSidebarLogin} />}
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/login" element={<Login />} />
              <Route path="/candidat" element={<Candidat />} />
              <Route path="/candidats" element={<Candidats />} />
              <Route path="/candidatP" element={<CandidatP />} />
              <Route path="/demandes" element={<Demandes />} />
              <Route path="/entrées-sorties" element={<EntréesSorties />} />
              <Route path="/postes" element={<Postes />} />
              <Route path="/candidatures" element={<Candidatures />} />
              <Route path="/dashboard-global" element={<DashboardGlobal />} />
              <Route path="/postes-r" element={<PostesR />} />
              <Route path="/candidats-r" element={<CandidatsR />} />
              <Route path="/employes" element={<Employes />} />
              <Route path="/recrutement" element={<Recrutement />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/absence" element={<Absence />} />
              <Route path="/profileP/:id" element={<ProfileP />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
