import './App.css';
import Navbar from './navbar.jsx';
import Recents from './recents.jsx';
import Genqr from './genqr.jsx';

function App() {
  return (
    <div id="root">
      <div className="nav">
        <Navbar />
      </div>
      <div className="Recents">
        <Recents />
      </div>
      <div className="genqr">
        <Genqr></Genqr>
      </div>
      </div>
      
      )
}

export default App;
