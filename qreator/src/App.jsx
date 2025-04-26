import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Home.jsx';
import History from './history.jsx';

function App() {
  
  return( 
    <Router>
      <div id="root">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>);
}

export default App;
