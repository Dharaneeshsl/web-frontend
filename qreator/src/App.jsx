import './App.css';
import Navbar from './navbar.jsx';
import Recents from './recents.jsx';
import Genqr from './genqr.jsx';
import Cursor from './cursor.jsx';

function App() {
  const cursor = document.querySelector('.cursor');
  window.addEventListener("mousemove", (e) => {
    let cursor = document.getElementById("cursor");
    setTimeout(() => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    }, 50);
  });

  document.querySelectorAll('h1, p').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'A') {
        cursor.classList.add('active');
      }
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });

  return (
    <div id="root">
      <div className='cursor' id='cursor'> </div>
      <div className="nav" id='nav'>
        <Navbar />
      </div>
      <div className="Recents" id='Recents'>
        <Recents />
      </div>
      <div className="genqr" id='genqr'>
        <Genqr />
      </div>
    </div>
  );
}

export default App;
