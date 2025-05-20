import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Home.jsx';
import History from './history.jsx';
import Dashboard from "./Dashboard.jsx";
import Contributors from "./contributors.jsx";
import LandingPage from "./landingpage.jsx";
import UrlHistory from "./urlhistory.jsx";
function App() {
  
  return( 
    <Router>
      <div id="root">
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contributors" element={<Contributors />} />
        </Routes>
      </div>
    </Router>);
}

export default App;
