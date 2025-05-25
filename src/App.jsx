import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Home.jsx';
import History from './history.jsx';
import Dashboard from "./Dashboard.jsx";
import Contributors from "./contributors.jsx";
import LandingPage from "./landingpage.jsx";
import Login from "./login.jsx";
import UrlHistory from "./urlhistory.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { RefreshProvider } from "./RefreshContext.jsx";
import { Toaster } from "react-hot-toast";
function App() {


 
  return( 
  
    <Router>
       <AuthProvider>
        <RefreshProvider>
          <Toaster position="bottom-center" />
      <div id="root">
        
        <Routes>
         
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/history" element={<History />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login /> } />

        </Routes>
     
      </div>
      </RefreshProvider>
      </AuthProvider>
    </Router>);
}

export default App;
