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
import BulkURLShortener from "./bulkshorten.jsx"
import Activate from "./activate.jsx";
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
          <Route path="/history" element={<PrivateRoute> <History /></PrivateRoute>} />
          <Route path="/contributors" element={<Contributors />} />
          <Route path="/dashboard/:id" element={<PrivateRoute><Dashboard /> </PrivateRoute>} />
          <Route path="/login" element={<Login /> } />
          <Route path="/bulk" element={<BulkURLShortener /> } />
          <Route path="/activate" element={<Activate></Activate>}></Route>

        </Routes>
     
      </div>
      </RefreshProvider>
      </AuthProvider>
    </Router>);
}

export default App;
